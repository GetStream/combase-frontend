import React, { useCallback, useLayoutEffect, useReducer, useRef, useState, useMemo } from 'react';
import throttle from 'lodash.throttle';
import { nanoid } from 'nanoid';

import { useActiveChannel, useChatClient, useIsMounted } from '../../hooks';

import { ChannelContext } from './context';
import { reducer, initialState } from './state';

const insertDates = messages => {
    const newMessages = [];

    for (let i = 0, l = messages.length; i < l; i += 1) {
        const message = messages[i];

        if (message.type === 'message.read') {
            newMessages.push(message);

            // eslint-disable-next-line no-continue
            continue;
        }

        const messageDate = message.created_at.toDateString();
        let prevMessageDate = messageDate;

        if (i > 0) {
            prevMessageDate = messages[i - 1].created_at.toDateString();
        }

        if (
            (i === 0 || messageDate !== prevMessageDate) &&
            newMessages?.[newMessages.length - 1]?.type !== 'message.date' // prevent two subsequent DateSeparator
        ) {
            newMessages.push(
                {
                    type: 'message.date',
                    date: message.created_at,
                },
                message
            );
        } else {
            newMessages.push(message);
        }
    }

    return newMessages;
};

export const Channel = ({ channel, children }) => {
    const client = useChatClient();
    const [watching, setWatching] = useState(false);

    const lastRead = useRef(new Date());
    const activeChannel = useActiveChannel();
    const isMounted = useIsMounted();

    /** Channel State */
    const [state, dispatch] = useReducer(reducer, initialState);

    /** Dispatch Actions */
    const updateMessage = useCallback(
        updatedMessage => {
            channel.state.addMessageSorted(updatedMessage, true);

            dispatch({
                channel,
                parentId: state.thread && updatedMessage.parent_id,
                type: 'copyMessages',
            });
        },
        [channel, state.thread]
    );

    const copyChannelState = useCallback(
        throttle(
            () => {
                dispatch({
                    channel,
                    type: 'copyState',
                });
            },
            500,
            {
                leading: true,
                trailing: true,
            }
        ),
        [channel]
    );

    const markRead = useCallback(async () => {
        if (channel.disconnected || !channel.getConfig()?.read_events) {
            return;
        }

        lastRead.current = new Date();

        await channel.markRead();
    }, [channel]);

    const markReadThrottled = useCallback(
        throttle(markRead, 500, {
            leading: true,
            trailing: true,
        }),
        [markRead]
    );

    /** Events */
    const handleEvent = useCallback(
        e => {
            dispatch({
                channel,
                message: e.message,
                type: 'updateThread',
            });

            if (e.type === 'message.new') {
                let mainChannelUpdated = true;

                if (e.message.parent_id && !e.message.show_in_channel) {
                    mainChannelUpdated = false;
                }

                if (mainChannelUpdated && e.message.user.id !== client.userID) {
                    if (!document.hidden) {
                        markReadThrottled();
                    }
                }
            }
            copyChannelState();
        },
        [channel, client.userID, copyChannelState, markReadThrottled]
    );

    /** Messages */
    const loadMoreFinished = useCallback((hasMore, messages) => {
        if (!isMounted.current) {
            return;
        }

        dispatch({
            hasMore,
            messages,
            type: 'loadMoreFinished',
        });
    }, []);

    const loadMore = useCallback(
        async (oldestMessage, limit = 100, reportNewItemCount) => {
            if (oldestMessage?.status !== 'received') {
                return;
            }

            dispatch({
                loadingMore: true,
                type: 'setLoadingMore',
            });

            const oldestID = oldestMessage?.id;

            const perPage = limit;
            let queryResponse;

            try {
                queryResponse = await channel.query({
                    messages: {
                        id_lt: oldestID,
                        limit: perPage,
                    },
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn('message pagination request failed with error', error);

                dispatch({
                    loadingMore: false,
                    type: 'setLoadingMore',
                });

                return;
            }

            const hasMoreMessages = queryResponse.messages.length === perPage;

            if (reportNewItemCount) {
                reportNewItemCount(prev => prev - queryResponse.messages.length);
            }

            await loadMoreFinished(hasMoreMessages, channel.state.messages);
        },
        [channel, loadMoreFinished]
    );

    /** Send Message */
    const handleSendMessage = useCallback(
        async message => {
            const { text, attachments, id, parent_id, mentioned_users } = message;

            const messageData = {
                attachments,
                id,
                mentioned_users,
                parent_id,
                text,
            };

            try {
                const messageResponse = await channel.sendMessage(messageData);

                // replace it after send is completed
                if (messageResponse && messageResponse.message) {
                    updateMessage({
                        ...messageResponse.message,
                        status: 'received',
                    });
                }
            } catch (error) {
                // set the message to failed..
                updateMessage({
                    ...message,
                    status: 'failed',
                });
            }
        },
        [channel, updateMessage]
    );

    const createMessagePreview = useCallback(
        (text, attachments, parent, mentioned_users) => {
            // create a preview of the message
            const clientSideID = `${client.user.id}-${nanoid()}`;

            return {
                __html: text,
                attachments,
                created_at: new Date(),
                html: text,
                id: clientSideID,
                mentioned_users,
                reactions: [],
                status: 'sending',
                text,
                type: 'regular',
                user: client.user,
                ...(parent?.id ? { parent_id: parent.id } : null),
            };
        },
        [client.user]
    );

    const sendMessage = useCallback(
        async ({ text, attachments = [], mentioned_users = [], parent }) => {
            channel.state.filterErrorMessages();

            const messagePreview = createMessagePreview(text, attachments, parent, mentioned_users);

            if (!text.startsWith('/')) {
                updateMessage(messagePreview);
            }

            await handleSendMessage(messagePreview);
        },
        [channel.state, createMessagePreview, handleSendMessage, updateMessage]
    );

    /** Edit/Retry/Remove Message */
    const editMessage = useCallback(
        updatedMessage => {
            if (updateMessage && channel) {
                return Promise.resolve(updateMessage(channel.cid, updatedMessage));
            }

            return client.updateMessage(updatedMessage);
        },
        [channel, client, updateMessage]
    );

    const retrySendMessage = useCallback(
        async message => {
            // set the message status to sending
            updateMessage({
                ...message,
                status: 'sending',
            });

            // actually try to send the message...
            await handleSendMessage(message);
        },
        [handleSendMessage, updateMessage]
    );

    const removeMessage = useCallback(
        message => {
            channel.state.removeMessage(message);

            dispatch({
                channel,
                parentId: state.thread && message.parent_id,
                type: 'copyMessages',
            });
        },
        [channel, state.thread]
    );

    useLayoutEffect(() => {
        let errored = false;
        let done = false;

        const onVisibilityChange = () => {
            if (!document.hidden) {
                markRead();
            }
        };

        (async () => {
            try {
                activeChannel.current = channel.cid;
                await channel.watch({ presence: true });
                setWatching(true);
            } catch (error) {
                dispatch({
                    error,
                    type: 'error',
                });

                errored = true;
            }

            done = true;

            if (!errored) {
                dispatch({
                    channel,
                    type: 'init',
                });

                if (channel.countUnread() > 0) {
                    markRead();
                }

                document.addEventListener('visibilitychange', onVisibilityChange);

                channel.on(handleEvent);
            }
        })();

        return () => {
            if (errored || !done) {
                return;
            }

            activeChannel.current = null;

            document.removeEventListener('visibilitychange', onVisibilityChange);

            channel.off(handleEvent);
            channel.stopWatching();
        };
    }, [channel, handleEvent, markRead]);

    const contextValue = {
        ...state,
        actions: {
            editMessage,
            loadMore,
            removeMessage,
            retrySendMessage,
            sendMessage,
            updateMessage,
        },
        channel: watching ? channel : null,
    };

    return <ChannelContext.Provider value={contextValue}>{children}</ChannelContext.Provider>;
};

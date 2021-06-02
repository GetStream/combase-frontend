import { useCallback, useEffect, useRef, useMemo } from 'react';
import useSound from 'use-sound';
import { getChannel, useActiveChannel, useChatClient, useClientEvent } from '@combase.app/chat';
import { CHANNEL_STATE_FRAGMENT, NEW_TICKET_FRAGMENT, useApolloClient } from '@combase.app/apollo';
import uniqBy from 'lodash.uniqby';

import newMessageChime from './sounds/new_message_dashboard.wav';
import { channelToTicketEdge } from './utils';
import TicketManagerContext from './context';

export const TicketManager = ({ children }) => {
    /**
     * @description Apollo & Chat
     */
    const apollo = useApolloClient();
    const chatClient = useChatClient();
    const activeChannel = useActiveChannel();

    /**
     * @description Notifications State
     */
    const [notificationChime] = useSound(newMessageChime);
    const inBackgroundTab = useRef(false);
    const originalTitle = useRef();

    const handleNewTicket = useCallback(async e => {
        if (inBackgroundTab.current) {
            document.title = `🆕 New Conversation • ${originalTitle.current}`;
		}

        notificationChime();

        const channel = await getChannel(chatClient, 'combase', e.channel_id);
        const ticket = channelToTicketEdge(channel);

        ticket.node.unread = 1;

        apollo.cache.modify({
            fields: {
                tickets(existing) {
                    /** First update the ticket with the new unread & latest message. */
                    const newTicket = apollo.cache.writeFragment({
                        fragment: NEW_TICKET_FRAGMENT,
                        data: ticket.node,
                    });

                    const newTicketEdge = {
                        node: newTicket,
                        __typename: 'TicketEdge',
                    };

                    const newEdges = uniqBy([newTicketEdge, ...existing.edges], ({ node }) => node.__ref);

                    return {
                        ...existing,
                        edges: newEdges,
                        count: newEdges?.length,
                    };
                },
            },
        });
    }, [apollo.cache, chatClient, notificationChime]);

    const handleNewMessage = useCallback(
        async e => {
            if (inBackgroundTab.current) {
                document.title = `💬 New Messages • ${originalTitle.current}`;
            }

            if (e.message.user.id !== chatClient.userID) {
                notificationChime();
            }

            const channel = chatClient.channel('combase', e.channel_id);
            const active = activeChannel.current === channel.cid;

            apollo.cache.modify({
                fields: {
                    tickets(existing) {
                        /** First update the ticket with the new unread & latest message. */
                        const updatedTicket = apollo.cache.writeFragment({
                            id: apollo.cache.identify({
                                _id: e.channel_id,
                                __typename: 'Ticket',
                            }),
                            fragment: CHANNEL_STATE_FRAGMENT,
                            data: {
                                unread: active ? 0 : channel.countUnread() || 1,
                                latestMessageAt: e.message.created_at,
                                latestMessage: e.message.text,
                            },
                        });

                        /** The we force unique by the __ref from apollo, and reorder so the updatedTicket is first in the list */
                        const updatedTicketEdge = {
                            node: updatedTicket,
                            __typename: 'TicketEdge',
                        };

                        const newEdges = uniqBy([updatedTicketEdge, ...existing.edges], ({ node }) => node.__ref);

                        return {
                            ...existing,
                            edges: newEdges,
                            count: newEdges?.length,
                        };
                    },
                },
            });
        },
        [activeChannel, apollo.cache, chatClient, notificationChime]
    );

    const handleTicketRemoved = useCallback(async e => {
        apollo.cache.modify({
            fields: {
                tickets(existing) {
                    /** First remove the ticket from the cache. */
                    const removedRef = apollo.cache.identify({ _id: e.channel_id, __typename: 'Ticket' });
                    apollo.cache.evict(removedRef);

                    /** Now make sure its removed from the list of tickets */
                    const newEdges = existing.edges.filter(({ node: { __ref } }) => __ref !== removedRef);

                    return {
                        ...existing,
                        edges: newEdges,
                        count: newEdges?.length,
                    };
                },
            },
        });
    }, [apollo.cache]);

    /** Listens for channels that you are NOT watching */
    useClientEvent('notification.message_new', handleNewMessage);
    useClientEvent('message.new', handleNewMessage);
    useClientEvent('notification.added_to_channel', handleNewTicket);
    useClientEvent('notification.removed_from_channel', handleTicketRemoved);
    // useClientEvent('user.presence.changed', handleEvents); // TODO

    /**
     * @description Check tab visibility state.
     */
    const onVisibilityChange = useCallback(() => {
        inBackgroundTab.current = document.hidden;

        if (!document.hidden) {
            document.title = originalTitle.current;
        }
    }, []);

    useEffect(() => {
        originalTitle.current = document.title;
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [onVisibilityChange]);

    const context = useMemo(
        () => ({
            handleNewMessage,
            handleNewTicket,
        }),
        [handleNewMessage, handleNewTicket]
    );

    return <TicketManagerContext.Provider value={context}>{children}</TicketManagerContext.Provider>;
};

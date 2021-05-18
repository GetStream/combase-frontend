import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StreamChat } from 'stream-chat';
import { ChannelManager, ChatProvider } from '@combase.app/chat';
import { useClickAway, useLocalStorage, useToggle } from 'react-use';
import { themes } from '@combase.app/styles';

import WidgetContext from './context';
import { useOrganizationStreamKey } from './hooks';

const lsOpts = {
    raw: false,
    serializer: value => JSON.stringify(value),
    deserializer: str => JSON.parse(str),
};

/**
 * @name WidgetConfig
 * @desc Context wrapper for top-level widget state and configuration options.
 */
const WidgetConfig = ({ children, organization, theme }) => {
    const shellRef = useRef();
    const [open, toggleWidgetCard] = useToggle();
    const [chatClient, setChatClient] = useState();
    const [auth, setAuth] = useLocalStorage('auth', undefined, lsOpts);

    const [streamChatKey] = useOrganizationStreamKey(organization);

    useEffect(() => {
        if (!chatClient && streamChatKey) {
            const client = new StreamChat(streamChatKey);
            if (auth) {
                const { token, user } = auth;
                client.connectUser({ id: user }, token);
            } else {
                client.connectAnonymousUser();
            }
            setChatClient(client);
        }
    }, [streamChatKey]);

    const context = useMemo(
        () => ({
            chatClient,
            organization,
            auth,
            setAuth,
            loading: !chatClient,
            open,
            toggleWidgetCard,
            shellRef,
        }),
        [chatClient, open, toggleWidgetCard]
    );

	const handleClickAway = useCallback(() => toggleWidgetCard(open ? false : open), [open]);

    useClickAway(shellRef, handleClickAway);

    const { filters, sort } = useMemo(
        () => ({
            filters: {
                type: 'combase',
                members: { $in: [chatClient?.userID] },
            },
            sort: {
                last_message_at: -1,
            },
        }),
        [chatClient]
    );

    if (context.loading || !chatClient?.user) {
        return null;
    }

    return (
        <WidgetContext.Provider value={context}>
            <ThemeProvider theme={themes[theme]}>
                <ChatProvider client={chatClient}>
                    <ChannelManager filters={filters} sort={sort}>
						{children}
                    </ChannelManager>
                </ChatProvider>
            </ThemeProvider>
        </WidgetContext.Provider>
    );
};

export default WidgetConfig;

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useLocalStorage, useToggle } from 'react-use';
import { themes } from '@combase.app/styles';

import WidgetContext from './context';
import { useOrganizationStreamKey, useWidgetPathRestrictions } from './hooks';

const lsOpts = {
    raw: false,
    serializer: JSON.stringify,
    deserializer: JSON.parse,
};

/**
 * @name WidgetConfig
 * @desc Context wrapper for top-level widget state and configuration options.
 */
const WidgetConfig = ({ children, organization, theme }) => {
    const shellRef = useRef();
    const [open, toggleWidgetCard] = useToggle();
    const [chatClient, setChatClient] = useState();
    const [initialAuth, persistAuth] = useLocalStorage('auth', undefined, lsOpts);
	const [auth, setAuthState] = useState(initialAuth);

    const [streamChatKey] = useOrganizationStreamKey(organization);

	// check the widget should be displayed based on org.widget.paths...
	const show = useWidgetPathRestrictions(organization);

    useEffect(() => {
        if (show && !chatClient && streamChatKey) {
            const client = new StreamChat(streamChatKey);
			client.setBaseURL('https://chat.stream-io-api.com');

            if (auth) {
                const { token, user } = auth;
                client.connectUser({ id: user }, token);
            } else {
                client.connectAnonymousUser();
            }
            setChatClient(client);
        }
    }, [show, streamChatKey]);

	const setAuth = useCallback((data) => {
		persistAuth(data);
		setAuthState(data);
	}, []);

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
        [auth, chatClient, open, toggleWidgetCard]
    );

	// const handleClickAway = useCallback(() => toggleWidgetCard(open ? false : open), [open]);
    // useClickAway(shellRef, handleClickAway);

    if (!show || (context.loading || !chatClient?.user)) {
        return null;
    }

    return (
        <WidgetContext.Provider value={context}>
            <ThemeProvider theme={themes[theme]}>
                <Chat client={chatClient}>
					{children}
                </Chat>
            </ThemeProvider>
        </WidgetContext.Provider>
    );
};

export default WidgetConfig;

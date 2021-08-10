import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useLocalStorage, useToggle, useMedia } from 'react-use';
import { themes } from '@combase.app/styles';

import WidgetContext from './context';
import { useOrganizationStreamKey, useWidgetPathRestrictions, useWidgetThemeSettings } from './hooks';

const lsOpts = {
    raw: false,
    serializer: JSON.stringify,
    deserializer: JSON.parse,
};

const prepareTheme = (theme, overrides) => ({
	...theme,
	colors: {
		...theme.colors,
		primary: overrides?.accent ?? theme.colors.primary,
	}
});

/**
 * @name WidgetConfig
 * @desc Context wrapper for top-level widget state and configuration options.
 */
const WidgetConfig = ({ children, organization }) => {
    const shellRef = useRef();
    const [open, toggleWidgetCard] = useToggle();
    const [chatClient, setChatClient] = useState();
    const [initialAuth, persistAuth] = useLocalStorage('auth', undefined, lsOpts);
	const [auth, setAuthState] = useState(initialAuth);

    const [streamChatKey] = useOrganizationStreamKey(organization);

	// check the widget should be displayed based on org.widget.paths...
	const show = useWidgetPathRestrictions(organization);
	// Get the theming customization for the widget
	const [themeSettings] = useWidgetThemeSettings(organization);
	const systemDarkMode = useMedia(`(prefers-color-scheme: dark)`);

	const theme = useMemo(() => {
		if (!themeSettings?.uitheme || themeSettings?.uitheme === 'system') {
			const themeObj = systemDarkMode ? themes.dark : themes.light;
			return prepareTheme(themeObj, themeSettings);
		}
 
		return prepareTheme(themes[themeSettings.uitheme], themeSettings);
	}, [themeSettings, systemDarkMode]);
	console.log(theme);

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
            <ThemeProvider theme={theme}>
                <Chat client={chatClient}>
					{children}
                </Chat>
            </ThemeProvider>
        </WidgetContext.Provider>
    );
};

export default WidgetConfig;

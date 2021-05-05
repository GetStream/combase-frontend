import { StreamChat } from 'stream-chat';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMedia } from 'react-use';
import { ThemeProvider } from 'styled-components';
import { connect as feedsClient } from 'getstream';
import { ToastProvider } from 'react-toast-notifications';

import { ChatProvider } from '@combase.app/chat';
import { LoadingScreen, FeedsProvider, Snackbar } from '@combase.app/ui';
import { themes } from '@combase.app/styles';
import { themeVar, useReactiveVar, useQuery, GET_CURRENT_USER } from '@combase.app/apollo';

const toastComponents = {
	Toast: Snackbar,
}

const createAuthedChatClient = ({ me: user, organization }) => {
    const client = new StreamChat(organization.stream.key, null, null, { location: 'us-east' });

    client.connectUser(
        {
            id: user._id,
        },
        user.streamToken
    );

    return client;
};

const createAuthedFeedsClient = ({ me: user, organization }) => {
    const client = feedsClient(organization.stream.key, user.streamToken, null, { location: 'us-east' });
    return client;
};

export const ShellProvider = ({ children }) => {
    const {data} = useQuery(GET_CURRENT_USER);

    /**
     * @name Theme
     */
    const themeMode = useReactiveVar(themeVar);
    const systemDarkMode = useMedia(`(prefers-color-scheme: dark)`);

    const theme = useMemo(() => {
        // TODO: Deepmerge with org theme in mongo.
        if (themeMode === 'system') {
            return systemDarkMode ? 'dark' : 'light';
        }

        return themeMode;
    }, [themeMode, systemDarkMode]);

    /**
     * Initialize Stream Clients.
     */
    const initialized = useRef(false);
    const [chatClient, setChatClient] = useState();
    const [feedsClient, setFeedsClient] = useState();

    useEffect(() => {
        if (data?.me && !initialized.current) {
            initialized.current = true;
            setChatClient(() => createAuthedChatClient(data));
            setFeedsClient(() => createAuthedFeedsClient(data));
        }
    }, [data]);
	
    if (!chatClient || !feedsClient) {
        return <LoadingScreen />;
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <ToastProvider components={toastComponents}>
				<FeedsProvider client={feedsClient}>
					<ChatProvider client={chatClient}>
						{children}
					</ChatProvider>
				</FeedsProvider>
			</ToastProvider>
        </ThemeProvider>
    );
};

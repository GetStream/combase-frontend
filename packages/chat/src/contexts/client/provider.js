import React, { useMemo, useRef } from 'react';

import { ChatContext } from './context';

export const ChatProvider = ({ children, client }) => {
    const activeChannel = useRef();

    const value = useMemo(
        () => ({
            activeChannel,
            client,
        }),
        [client]
    );

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

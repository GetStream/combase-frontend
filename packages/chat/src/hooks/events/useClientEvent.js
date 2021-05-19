import { useEffect } from 'react';

import { useChatClient } from '../client/useChatClient';

export const useClientEvent = (event, handler) => {
    const client = useChatClient();

    useEffect(() => {
        client.on(event, handler);
		console.log(client);
        return () => {
            client.off(event, handler);
        };
    }, [event, handler]);
};

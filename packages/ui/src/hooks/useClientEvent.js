import { useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

export const useClientEvent = (event, handler) => {
    const {client} = useChatContext();

    useEffect(() => {
        client.on(event, handler);

        return () => {
            client.off(event, handler);
        };
    }, [event, handler]);
};

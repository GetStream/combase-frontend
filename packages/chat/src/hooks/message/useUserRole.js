import { useMemo } from 'react';

import { useChannel } from '../channel/useChannel';
import { useChatClient } from '../client/useChatClient';

export const useUserRole = message => {
    const client = useChatClient();
    const channel = useChannel();

    return useMemo(() => {
        const isMyMessage = Boolean(message?.user) && Boolean(client?.user) && client.user.id === message.user.id;

        const isAdmin = client?.user?.role === 'admin' || channel?.state?.membership?.role === 'admin';

        const isOwner = channel?.state?.membership?.role === 'owner';

        const isModerator = channel?.state?.membership?.role === 'channel_moderator' || channel?.state?.membership?.role === 'moderator';

        const canEditMessage = isMyMessage || isModerator || isOwner || isAdmin;
        const canDeleteMessage = canEditMessage;

        return {
            canDeleteMessage,
            canEditMessage,
            isAdmin,
            isModerator,
            isMyMessage,
            isOwner,
        };
    }, [client, channel, message]);
};

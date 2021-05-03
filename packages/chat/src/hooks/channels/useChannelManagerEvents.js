import { useCallback, useEffect } from 'react';

import { getChannel } from '../../utils';
import { useChatClient } from '../client/useChatClient';
import { useClientEvent } from '../events/useClientEvent';

export const useChannelManagerEvents = (channels, members) => {
    const client = useChatClient();

    const handleEvents = useCallback(async e => {
        switch (e.type) {
            // We only 'watch' the channel when we are viewing it. So this will only fire when the chat is open and is essentially a fallback for notification.message_new when this is the active channel.
            case 'message.new':
            case 'notification.message_new':
            case 'notification.added_to_channel':
                const channel = await getChannel(client, e.channel_type, e.channel_id);
                channels.set(channel);

                break;

            case 'notification.removed_from_channel':
                channels.remove(e.channel);
                break;

            case 'user.presence.changed':
                members.set(e.user.id, e.user);

                break;

            default:
                return;
        }
    }, []);

    useEffect(() => {
        members.setAll(client.state.users);
    }, [client.state]);

    /** Listens on channels you are watching */
    useClientEvent('message.new', handleEvents);
    useClientEvent('member.added', e => console.log);
    useClientEvent('member.removed', e => console.log);

    /** Listens for channels that you are NOT watching */
    useClientEvent('notification.message_new', handleEvents);

    useClientEvent('notification.added_to_channel', handleEvents);
    useClientEvent('notification.removed_from_channel', handleEvents);
    useClientEvent('user.presence.changed', handleEvents);
};

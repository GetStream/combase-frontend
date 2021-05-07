import { useMemo } from 'react';

import { useChatClient } from '../client/useChatClient';
import { useChannelMembers } from './useChannelMembers';

/**
 * Hook to grab the partner user in a 1-to-1 channel
 *! Caution: Hook will work in all channels, but only ever
 *! returns one member.
 */
export const useChannelPartner = () => {
    const client = useChatClient();
	const members = useChannelMembers();

    return useMemo(() => Object.values(members || {}).find(member => member.user.id !== client.userID), [client, members]);
};

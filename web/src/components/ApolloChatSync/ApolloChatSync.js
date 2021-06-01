import { useCallback } from 'react';
import { GET_CURRENT_USER, gql, useQuery } from '@combase.app/apollo';
import { useClientEvent } from '@combase.app/ui';
import useSound from 'use-sound';

import newMessageChime from './sounds/new_message_dashboard.wav';

const ApolloChatSync = ({ children }) => {
	const [notificationChime] = useSound(newMessageChime);

	const { data, client } = useQuery(GET_CURRENT_USER)
	const me = data?.me;

	/**
	 * Connection Status
	 */
	const handleConnectionChanged = useCallback((e) => {
		const { online } = e;
		client.cache.writeFragment({
			data: {
				online,
				_id: me._id,
				__typename: "Agent",
			},
			fragment: gql`
				fragment UpdateAgentOnlineStatus on Agent {
					online @client
				}
			`
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [me]);

	useClientEvent('connection.changed', handleConnectionChanged);
	
	/**
	 * New Message
	 */
	const handleNotifyUser = useCallback((e) => {
		switch (e.type) {
			case 'message.new':
				if (e.user.id !== me?._id) {
					notificationChime();
				}
				break;
			default:
				notificationChime();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationChime, me]);

	useClientEvent('notification.message_new', handleNotifyUser);
    useClientEvent('message.new', handleNotifyUser);
	useClientEvent('notification.added_to_channel', handleNotifyUser);
    // useClientEvent('notification.removed_from_channel', handleNotifyUser);

	return children;
};

export default ApolloChatSync;
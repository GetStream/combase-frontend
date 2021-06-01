import { useCallback } from 'react';
import { GET_CURRENT_USER, gql, useQuery } from '@combase.app/apollo';
import { useClientEvent } from '@combase.app/ui';

const ApolloChatSync = ({ children }) => {
	const { data, client } = useQuery(GET_CURRENT_USER)
	const me = data?.me;

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

	return children;
};

export default ApolloChatSync;
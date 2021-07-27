import { useCallback, useState, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useChatContext } from "stream-chat-react";

const useChatUserPresence = id => {
	const { client } = useChatContext();
	const getUser = useCallback(async (agentId) => {
		try {
			const data = await client.queryUsers({ 
				id: { 
					$in: [agentId] 
				}},  
				{ id: -1 },  
				{ presence: true } 
			);
			const user = data.users[0];

			setOnlineStatus(user.online);
			return user;
		} catch (error) {
			console.error(error);
		}
	}, []);
		
	const [{ value: streamUser }, doGetUser] = useAsyncFn(getUser);
	const [isOnline, setOnlineStatus] = useState();

	const handleEvent = useCallback(({ user }) => {
		if (user.id === streamUser.id) {
			setOnlineStatus(user.online);
		}
	}, [streamUser]);

	useEffect(() => {
		doGetUser(id);
		client.on('user.presence.changed', handleEvent);
		
		return () => client.off('user.presence.changed', handleEvent);
	}, [id]);

	return isOnline;
}

export default useChatUserPresence;
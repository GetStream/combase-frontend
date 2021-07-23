import React, { useEffect, useRef, useState } from 'react';
import { Chat } from 'stream-chat-react';

import useCurrentUser from 'hooks/useCurrentUser';

import { createAuthedChatClient } from './utils';

const StreamContextProvider = ({ children }) => {
	const currentUser = useCurrentUser();
	/**
     * Initialize Stream Clients.
     */
	 const initialized = useRef(false);
	 const [chatClient, setChatClient] = useState();
 
	 useEffect(() => {
		 if (currentUser?.data?.me && !initialized.current) {
			 initialized.current = true;
			 setChatClient(() => createAuthedChatClient(currentUser?.data));
		 }
	 }, [currentUser]);
	 
	 if (!chatClient) {
		 return <p>Loading...</p>;
	 }

	 return (
		<Chat client={chatClient}>
			{children}
		</Chat>
	 );
};
export default StreamContextProvider;
import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// import 'stream-chat-react/dist/css/index.css';

import Box from '@combase.app/ui/Box';

import AssignTicket from 'contexts/AssignTicket';

import ChatList from './ChatList';
import ChatThread from './ChatThread';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 22rem 1fr;
	grid-template-rows: 100vh;
`;

const Chats = () => {
	return (
		<AssignTicket>
			<Root>
				<Route path="/chats/:channelId?" component={ChatList} />
				<ChatThread />
			</Root>
		</AssignTicket>
	);
};

export default Chats;
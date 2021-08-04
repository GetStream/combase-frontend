import React, { useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Box from '@combase.app/ui/Box';

import CombaseChannel from './CombaseChannel';
import ChatDrawer from './ChatDrawer';

const Root = styled(Box)`
	border-left: 1px solid ${({ theme }) => theme.colors.border};
	height: 100%;
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-template-rows: 1fr;

	& .str-chat-channel {
		height: 100%;
	} 

	& .str-chat__container {
		height: 100%;
		display: grid;
		grid-template-rows: min-content min-content 1fr min-content;
	}
`;

const ChatThread = () => {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<Root $drawerOpen={showDrawer}>
			<Route path="/chats/:channelId">
				{() => <CombaseChannel openDrawer={() => setShowDrawer(true)} />}
			</Route>
			{showDrawer ? <ChatDrawer onClose={() => setShowDrawer(false)} /> : null}
		</Root>
	);
};

export default ChatThread;
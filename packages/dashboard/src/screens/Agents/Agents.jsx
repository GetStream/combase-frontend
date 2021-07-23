import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Box from '@combase.app/ui/Box';

import AgentsList from './AgentsList';
import ProfileDrawer from './ProfileDrawer';

const Root = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-template-rows: 1fr;
`;

const Agents = () => {
	return (
		<Root>
			<Route path="/agents/:agentId?" component={AgentsList} />
			<Route path="/agents/:agentId" component={ProfileDrawer} />
		</Root>
	);
};

export default Agents;
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useCurrentUser from 'hooks/useCurrentUser';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import StreamLogo from '@combase.app/ui/StreamLogo';
import { AgentsIcon, DashboardIcon, InboxIcon, PluginsIcon } from "@combase.app/ui/icons";

import SidenavItem from './SidenavItem';

const Root = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const Main = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const linkStyle = {
	textDecoration: 'none',
};

const Sidenav = () => {
	const currentUser = useCurrentUser();
	return (
		<Root width={13} paddingY={4}>
			<Main>
				<StreamLogo size={7} />
				<Box marginY={0} width="100%">
					<SidenavItem icon={DashboardIcon} label="Home" exact to="/" path="/" />
					<SidenavItem icon={InboxIcon} label="Chats" to="/chats" path="/chats" />
					<SidenavItem icon={AgentsIcon} label="Agents" to="/agents" path="/agents" />
					<SidenavItem icon={PluginsIcon} label="Integrations" to="/integrations" path="/integrations" />
				</Box>
			</Main>
			<Link to="/settings/your-profile" style={linkStyle}>
				<Avatar 
					name={currentUser.data?.me.name.full} 
					// src={currentUser.data?.me.avatar} 
				/>
			</Link>
		</Root>
	);
};

export default Sidenav;
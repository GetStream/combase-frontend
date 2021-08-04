import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';

import useCurrentUser from 'hooks/useCurrentUser';
import useChatNotifications from 'hooks/useChatNotifications';

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

const SettingsAvatar = styled(Avatar)`
	border: 2px solid ${({ theme }) => theme.colors.border};
`;

const linkStyle = {
	textDecoration: 'none',
};

const Sidenav = () => {
	const currentUser = useCurrentUser();
	useChatNotifications();
	
	const { client } = useChatContext();
	const [totalUnread, setTotalUnread] = useState(client.user.total_unread_count ?? 0);

	const handleEvent = useCallback((event) => {
		if (event.total_unread_count !== undefined) { 
			setTotalUnread(event.total_unread_count); 
		} 
	}, [])

	useEffect(() => {
		client.on(handleEvent);
		return () => client.off(handleEvent);
	}, []);

	return (
		<Root backgroundColor="surface" width={13} paddingY={4}>
			<Main>
				<StreamLogo size={7} />
				<Box marginY={0} width="100%">
					<SidenavItem icon={DashboardIcon} label="Home" exact to="/" path="/" />
					<SidenavItem icon={InboxIcon} label="Chats" to="/chats" path="/chats" badge={totalUnread} />
					<SidenavItem icon={AgentsIcon} label="Agents" to="/agents" path="/agents" />
					<SidenavItem icon={PluginsIcon} label="Integrations" to="/integrations" path="/integrations" />
				</Box>
			</Main>
			<Link to="/settings/your-profile" style={linkStyle}>
				<SettingsAvatar 
					name={currentUser.data?.me.name.full} 
					src={currentUser.data?.me.avatar} 
				/>
			</Link>
		</Root>
	);
};

export default Sidenav;
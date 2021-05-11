import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import CombaseWidget from '@combase.app/widget';
import { authenticationVar, useReactiveVar, useQuery, GET_ORGANIZATION } from '@combase.app/apollo';
import { Box } from '@combase.app/ui';

import { ShellProvider } from 'contexts/Shell';
import { useReactiveMedia } from 'hooks';
import { Conversations, Integration, Integrations, Settings, Tickets } from 'screens';

import { SidebarNav } from 'components/SidebarNav';

const Root = styled(Box)`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        display: grid;
        grid-template-columns: ${({ theme }) => theme.sizes.sidenav} 1fr;
        grid-auto-rows: 100%;
    }
`;

const conversationsRedirect = ({ match }) => <Redirect replace to={`${match.url}/inbox`} />;

const Dashboard = () => {
	const authed = useReactiveVar(authenticationVar);
	const isSm = useReactiveMedia('sm');

	const { data } = useQuery(GET_ORGANIZATION);

	if (!authed) {
		return <Redirect replace to="/" />;
	}

	const organization = data?.organization?._id;

	return (
		<ShellProvider>
			<Root>
				{isSm?.matches ? <SidebarNav /> : null}
				<Switch>
					<Route 
						path="/dashboard/integrations/:integrationId/:page?"
						component={Integration} 
					/>
					<Route 
						path="/dashboard/integrations"
						component={Integrations} 
					/>
					<Route 
						path="/dashboard/settings/:page?"
						component={Settings} 
					/>
					<Route 
						path="/dashboard/conversations/:inbox/:channelId?"
						component={Conversations} 
					/>
					<Route 
						path="/dashboard/tickets"
						component={Tickets} 
					/>
					<Route path={`/dashboard/conversations`} render={conversationsRedirect} />
				</Switch>
			</Root>
			{organization ? <CombaseWidget organization={organization} /> : null}
		</ShellProvider>
	);
}

export default Dashboard;
import React from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';

import { authenticationVar, useReactiveVar } from '@combase.app/apollo';
import { Box } from '@combase.app/ui';

import { ShellProvider } from 'contexts/Shell';
import { useReactiveMedia } from 'hooks';

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

	if (!authed) {
		return <Redirect replace to="/" />;
	}

	return (
		<ShellProvider>
			<Root>
				{isSm ? <div /> : null}
				<Switch>
					<Route 
						path="/dashboard/conversations/:inbox/:channelId?"
						components={Conversations} 
					/>
					<Route path={`/dashboard/conversations`} render={conversationsRedirect} />
				</Switch>
			</Root>
		</ShellProvider>
	);
}

export default Dashboard;
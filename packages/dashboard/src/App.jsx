import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Zoom as ToastTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import GlobalStyle from 'styles/global';

import Modal from '@combase.app/ui/Modal';

import {ApolloProvider} from 'apollo/provider';

import StreamContextProvider from 'contexts/Stream/provider';
import { ThemeSwitcher } from 'contexts/ThemeSwitcher';

import Auth from 'screens/Auth';
import Settings from 'screens/Settings';
import Chats from 'screens/Chats';
import Agents from 'screens/Agents';
import Integrations from 'screens/Integrations';

import useCurrentUser from 'hooks/useCurrentUser';

import Sidenav from 'components/Sidenav';
import CropImageDialog from 'components/CropImageDialog/CropImageDialog';

import Box from '@combase.app/ui/Box';

const Root = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-columns: min-content 1fr;
`;

function Dashboard() {
	const {data, loading} = useCurrentUser();

	if (!loading && !data?.me) {
		return <Redirect replace to='/auth/login' />
	}

	return (
		<StreamContextProvider>
			<Root>
				<Sidenav />
				<Switch>
					<Route path="/agents" component={Agents} />
					<Route path="/chats" component={Chats} />
					<Route path="/integrations/:category?" component={Integrations} />
				</Switch>
				<Route path="/settings">
					{({ history, match }) => <Modal component={Settings} open={match} onClose={history.goBack} />}
				</Route>
				<Route path="/crop-image">
					{({ history, match }) => <Modal component={CropImageDialog} open={match} onClose={history.goBack} />}
				</Route>
			</Root>
		</StreamContextProvider>
	);
}

function App() {
	return (
		<ApolloProvider endpoint={import.meta.env.VITE_APP_API_URL}>
			<ThemeSwitcher>
				<Router>
					<Switch>
						<Route path="/auth" component={Auth} />
						<Route component={Dashboard} />
					</Switch>
				</Router>
				<GlobalStyle />
				<ToastContainer autoClose={2000} transition={ToastTransition} closeButton={false} />
			</ThemeSwitcher>
		</ApolloProvider>
	);
}

export default App

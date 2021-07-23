import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyle from 'styles/global';

import Modal from '@combase.app/ui/Modal';

import {ApolloProvider} from 'apollo/provider';

import StreamContextProvider from 'contexts/Stream/provider';
import { ThemeSwitcher } from 'contexts/ThemeSwitcher';

import Settings from 'screens/Settings';
import Chats from 'screens/Chats';
import Agents from 'screens/Agents';
import Integrations from 'screens/Integrations';

import Sidenav from 'components/Sidenav';

import Box from '@combase.app/ui/Box';

const Root = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-columns: min-content 1fr;
`;

function App() {
	return (
		<ApolloProvider endpoint={import.meta.env.VITE_APP_API_URL}>
			<ThemeSwitcher>
				<StreamContextProvider>
					<Router>
						<Root>
							<Sidenav />
							<Switch>
								<Route path="/agents" component={Agents} />
								<Route path="/chats" component={Chats} />
								<Route path="/integrations" component={Integrations} />
							</Switch>
						</Root>
						<Route path="/settings">
							{({ history, match }) => <Modal component={Settings} open={match} onClose={history.goBack} />}
						</Route>
					</Router>
				</StreamContextProvider>
				<GlobalStyle />
			</ThemeSwitcher>
		</ApolloProvider>
	);
}

export default App

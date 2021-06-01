import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@combase.app/apollo';
import { themes } from '@combase.app/styles';

// import 'stream-chat-react/dist/css/index.css';

import {Auth, Dashboard} from './shells';

function App() {
  return (
    <ThemeProvider theme={themes.light}>
        <ApolloProvider endpoint={process.env.REACT_APP_API_URL}>		
			<Router>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/" component={Auth} />
				</Switch>
			</Router>
		</ApolloProvider>
	</ThemeProvider>
  );
}

export default App;

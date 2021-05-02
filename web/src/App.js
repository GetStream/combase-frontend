import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Auth, Dashboard} from './shells';

function App() {
  return (
    <Router>
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	</Router>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { useChatContext } from 'stream-chat-react';

// import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyle from './globalStyle';

import { WidgetConfig } from './WidgetConfig';
import { WidgetLauncher } from './WidgetLauncher';
import { WidgetShell } from './WidgetShell';

import Conversation from './views/Conversation';
import Home from './views/Home';

// import routes from './routes';

// const renderRoute = (route, i) => {
//     const Layout = route.layout || Fragment;
//     const Guard = route.guard || Fragment;
//     const Component = route.component;

//     return (
//         <Route
//             key={route.path}
//             path={route.path}
//             exact={route.exact}
//             render={props => (
//                 <Guard>
//                     <Layout>{route.routes ? renderRoute(route.routes) : <Component {...props} />}</Layout>
//                 </Guard>
//             )}
//         />
//     );
// };

// const widgetRoutes = routes.map(renderRoute);

const Router = () => {
	const { channel } = useChatContext();
	return !channel ? (
		<Home />
	) : (
		<Conversation />
	);
};

const CombaseWidget = ({ fabSize, organization, theme }) => (
    <WidgetConfig organization={organization} theme={theme}>
        <WidgetShell fabSize={fabSize} open={open}>
        	<Router />
        </WidgetShell>
        <WidgetLauncher size={fabSize} />
		<GlobalStyle />
    </WidgetConfig>
);

CombaseWidget.propTypes = {
    fabSize: PropTypes.number,
    organization: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light', 'system']),
};

CombaseWidget.defaultProps = {
    fabSize: 10,
    theme: 'light',
};

export default CombaseWidget;
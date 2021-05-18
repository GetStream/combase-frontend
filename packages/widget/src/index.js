import React, { Fragment } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import { MemoryRouter, Switch, Route } from 'react-router-dom';

import { WidgetConfig } from './WidgetConfig';
import { WidgetLauncher } from './WidgetLauncher';
import { WidgetShell } from './WidgetShell';
import routes from './routes';

const renderRoutes = (route, i) => {
    const Layout = route.layout || Fragment;
    const Guard = route.guard || Fragment;
    const Component = route.component;

    return (
        <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={props => (
                <Guard>
                    <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                </Guard>
            )}
        />
    );
};

const widgetRoutes = routes.map(renderRoutes);

const CombaseWidget = ({ fabSize, organization, theme }) => (
    <WidgetConfig organization={organization} theme={theme}>
        <WidgetShell fabSize={fabSize} open={open}>
        	<MemoryRouter>
				<Switch>{widgetRoutes}</Switch>
			</MemoryRouter>
        </WidgetShell>
        <WidgetLauncher size={fabSize} />
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

export const init = (opts) => {
	render(<CombaseWidget {...opts} />, document.getElementById('combase_widget'));
};

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { MemoryRouter, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Box, Chip, PageHeader, Snackbar, Tabs, Tab, Container } from '@combase.app/ui';
import { ToastProvider } from 'react-toast-notifications';

import ProfileSettings from './ProfileSettings';
import OrganizationSettings from './OrganizationSettings';
import WidgetSettings from './WidgetSettings';
import ManageUsers from './ManageUsers';

const toastComponents = {
	Toast: Snackbar,
}

const Root = styled(Box)`
	height: 100%;
`;

const TabWrapper =  styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Settings = () => {
	const history = useHistory();
	const params = useParams();

	const handleTabChange = useCallback(
		slug => {
			history.push(
				slug
					? `/${slug}`
					: `/`,
				{
					preserve: false,
				}
			);
		},
		[history]
	);

	return (
		<Root>
			<PageHeader variant="fluid" title="Settings" showOrganization>
				<TabWrapper variant="fluid">
					<Tabs onChange={handleTabChange} value={params.page}>
						<Tab label="Profile" value="profile" />
						<Tab label="Organization" value="organization" />
						<Tab reverseLabel icon={<Chip color="text" label='2' />} label="Users" value="users" />
						<Tab label="Tags" value="tags" />
						<Tab label="Widget" value="widget" />
						<Tab label="Integrations" value="integrations" />
					</Tabs>
				</TabWrapper>
				<Switch>
					<Route path="/profile" component={ProfileSettings} />
					<Route path="/organization" component={OrganizationSettings} />
					<Route path="/users" component={ManageUsers} />
					<Route path="/widget" component={WidgetSettings} />
				</Switch>
			</PageHeader>
		</Root>
	)
}

export default {
	title: 'Screens/Settings',
	decorators: [
		Story => (
			<ToastProvider components={toastComponents} transitionDuration={100} placement="top-right">
				<MemoryRouter initialEntries={['/profile']} initialIndex={0}>
					<Route path="/:page?" component={Story} />
				</MemoryRouter>
			</ToastProvider>
		)
	],
	component: Settings,
}
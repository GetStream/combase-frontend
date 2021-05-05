import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MemoryRouter, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Box, Chip, FeedsProvider, PageHeader, Snackbar, Tabs, Tab, Container } from '@combase.app/ui';
import { GET_ORGANIZATION_PROFILE, useQuery } from '@combase.app/apollo';
import { ToastProvider } from 'react-toast-notifications';
import { connect as connectFeeds } from 'getstream';

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
	
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);

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
						<Tab reverseLabel icon={<Chip color="text" label={data?.organization?.agents?.count} />} label="Agents" value="users" />
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

const createAuthedFeedsClient = (key, token) => {
    const client = connectFeeds(key, token, null, { location: 'us-east' });
    return client;
};

export default {
	title: 'Screens/Settings',
	decorators: [
		Story => {
			const [feedsClient, setFeedsClient] = useState(null);

			useEffect(() => {
				setFeedsClient(() => createAuthedFeedsClient(process.env.STORYBOOK_STREAM_KEY, process.env.STORYBOOK_TEST_USER_TOKEN));
			}, []);

			if (!feedsClient) {
				return null;
			}

			return (
				<FeedsProvider client={feedsClient}>
					<ToastProvider components={toastComponents} transitionDuration={100} placement="top-right">
						<MemoryRouter initialEntries={['/profile']} initialIndex={0}>
							<Route path="/:page?" component={Story} />
						</MemoryRouter>
					</ToastProvider>
				</FeedsProvider>
			);
		}
	],
	component: Settings,
}
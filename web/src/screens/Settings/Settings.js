import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Box, Chip, PageHeader, Tabs, Tab, Container } from '@combase.app/ui';
import { GET_ORGANIZATION_PROFILE, useQuery } from '@combase.app/apollo';

import ProfileSettings from './ProfileSettings';
import OrganizationSettings from './OrganizationSettings';
import WidgetSettings from './WidgetSettings';
import ManageUsers from './ManageUsers';

const Root = styled(Box)`
	height: 100%;
`;

const TabWrapper =  styled(Container)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Settings = () => {
	const history = useHistory();
	const params = useParams();
	
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);

	const handleTabChange = useCallback(
		slug => {
			history.push(
				slug
					? `/dashboard/settings/${slug}`
					: `/dashboard/settings/`,
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
					<Route path="/dashboard/settings/profile" component={ProfileSettings} />
					<Route path="/dashboard/settings/organization" component={OrganizationSettings} />
					<Route path="/dashboard/settings/users" component={ManageUsers} />
					<Route path="/dashboard/settings/widget" component={WidgetSettings} />
				</Switch>
			</PageHeader>
		</Root>
	)
}

export default Settings;
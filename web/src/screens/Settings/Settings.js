import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { AddUsersIcon, Button, Chip, PageHeader, Tabs, Tab, Text, Container, PageCard } from '@combase.app/ui';
import { GET_ORGANIZATION_PROFILE, useQuery } from '@combase.app/apollo';

import AddTagDialog from 'components/modals/AddTagDialog';

import ProfileSettings from './ProfileSettings';
import OrganizationSettings from './OrganizationSettings';
import WidgetSettings from './WidgetSettings';
import ManageTags from './ManageTags';
import ManageUsers from './ManageUsers';

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
		<PageCard variant="withHeader">
			<PageHeader 
				variant="fluid" 
				title="Settings" 
				showOrganization 
				actions={[
					<Switch>
						<Route 
							exact 
							path="/dashboard/settings/tags" 
							component={AddTagDialog}
						/>
						<Route 
							exact 
							path="/dashboard/settings/users" 
							render={() => (
								<Button size="xs">
									<AddUsersIcon />
									<Text>Invite Agents</Text>
								</Button>
							)}
						/>
					</Switch>,
				]}
			>
				<TabWrapper variant="fluid">
					<Tabs onChange={handleTabChange} value={params.page}>
						<Tab label="Profile" value="profile" />
						<Tab label="Organization" value="organization" />
						<Tab reverseLabel icon={<Chip color="text" label={data?.organization?.agents?.count} />} label="Agents" value="users" />
						<Tab reverseLabel icon={<Chip color="text" label={data?.organization?.tags?.count} />} label="Tags" value="tags" />
						<Tab label="Widget" value="widget" />
						<Tab label="API" value="api" />
					</Tabs>
				</TabWrapper>
			</PageHeader>
			<Switch>
				<Route path="/dashboard/settings/profile" component={ProfileSettings} />
				<Route path="/dashboard/settings/organization" component={OrganizationSettings} />
				<Route path="/dashboard/settings/tags" component={ManageTags} />
				<Route path="/dashboard/settings/users" component={ManageUsers} />
				<Route path="/dashboard/settings/widget" component={WidgetSettings} />
			</Switch>
		</PageCard>
	)
}

export default Settings;
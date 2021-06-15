import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Box, PageHeader, ListItem, Menu, PageCard } from '@combase.app/ui';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';
import { Scrollbars } from 'rc-scrollbars';

import {AgentEntity} from 'components/Entities';
import NavigationMenuItem from 'components/NavigationMenuItem';

import ProfileSettings from './ProfileSettings';
import OrganizationSettings from './OrganizationSettings';
import WidgetSettings from './WidgetSettings';
import ManageTags from './ManageTags';
import ManageUsers from './ManageUsers';
import { SplitView } from 'layouts';

const Navigation =  styled(Scrollbars)`
	display: grid;
	grid-template-rows: min-content 1fr;
	height: 100%;
`;

const Settings = () => {
	const history = useHistory();
	const params = useParams();
	
	const { data } = useQuery(GET_CURRENT_USER);

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
		<PageCard>
			<SplitView columnTemplate="minmax(25%, 23rem) 1fr">
				<Navigation>
					<Scrollbars>
						<PageHeader 
							backgroundColor="surface"
							variant="fluid" 
							title="Settings"
						/>
						<Box paddingX={2}>
							<ListItem>
								<AgentEntity name={data?.me?.name?.full} meta={data?.me?.email} />
							</ListItem>
						</Box>
						<Menu paddingX={[2, 2, 3]}>
							<NavigationMenuItem label="Edit Profile" to="/dashboard/settings/profile" />
							<NavigationMenuItem label="Edit Availability" to="/dashboard/settings/availability" />
						</Menu>
						<Menu subheading="Preferences" paddingX={[2, 2, 3]}>
							<NavigationMenuItem label="Appearance" to="/dashboard/settings/appearance" />
							<NavigationMenuItem label="Notifications" to="/dashboard/settings/notifications" />
							<NavigationMenuItem label="Email Settings" to="/dashboard/settings/email" />
						</Menu>
						<Menu subheading="Organization" paddingX={[2, 2, 3]}>
							<NavigationMenuItem label="Manage Agents" to="/dashboard/settings/organization/agents" />
							<NavigationMenuItem label="Manage Tags" to="/dashboard/settings/organization/tags" />
							<NavigationMenuItem label="Quick Responses" to="/dashboard/settings/organization/quick-responses" />
						</Menu>
						<Menu subheading="Widget" paddingX={[2, 2, 3]}>
							<NavigationMenuItem label="Display Preferences" to="/dashboard/settings/widget" />
							<NavigationMenuItem label="Defaults" to="/dashboard/settings/widget" />
						</Menu>
					</Scrollbars>
				</Navigation>			
				<Switch>
					<Route path="/dashboard/settings/profile" component={ProfileSettings} />
					<Route path="/dashboard/settings/organization" component={OrganizationSettings} />
					<Route path="/dashboard/settings/tags" component={ManageTags} />
					<Route path="/dashboard/settings/users" component={ManageUsers} />
					<Route path="/dashboard/settings/widget" component={WidgetSettings} />
				</Switch>
			</SplitView>
		</PageCard>
	)
}

export default Settings;
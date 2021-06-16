import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Box, PageHeader, ListItem, Menu, PageCard, UserIcon, CalendarIcon, QuickResponseIcon, TagIcon, AgentsIcon, SwitchThemeIcon, RoleIcon } from '@combase.app/ui';
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
	const { data } = useQuery(GET_CURRENT_USER);
	return (
		<PageCard>
			<SplitView columnTemplate="minmax(25%, 20rem) 1fr">
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
							<NavigationMenuItem icon={UserIcon} label="Edit Profile" to="/dashboard/settings/profile" />
							<NavigationMenuItem icon={CalendarIcon} label="Edit Availability" to="/dashboard/settings/availability" />
							<NavigationMenuItem label="Notifications" to="/dashboard/settings/notifications" />
						</Menu>
						<Menu subheading="Organization" paddingX={[2, 2, 3]}>
							<NavigationMenuItem icon={AgentsIcon} label="Manage Agents" to="/dashboard/settings/organization/agents" />
							<NavigationMenuItem icon={TagIcon} label="Manage Tags" to="/dashboard/settings/organization/tags" />
							<NavigationMenuItem icon={QuickResponseIcon} label="Quick Responses" to="/dashboard/settings/organization/quick-responses" />
							<NavigationMenuItem icon={RoleIcon} label="Security Preferences" to="/dashboard/settings/organization/security" />
							<NavigationMenuItem icon={SwitchThemeIcon} label='Theme' to="/dashboard/settings/theme" />
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
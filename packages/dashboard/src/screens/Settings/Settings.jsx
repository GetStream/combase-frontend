import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'rc-scrollbars';
import { Route, Switch } from 'react-router-dom';

import Box from '@combase.app/ui/Box';
import Card from '@combase.app/ui/Card';
import Container from '@combase.app/ui/Container';
import IconButton from '@combase.app/ui/IconButton';
import { CalendarIcon, CloseIcon, OrganizationIcon, SettingsIcon, SwitchThemeIcon, UserIcon, WidgetIcon } from '@combase.app/ui/icons';
import Text from '@combase.app/ui/Text';

import HeaderBase from 'components/HeaderBase';
import NavigationMenuItem from 'components/NavigationMenuItem';

import Availability from './views/Availability';
import Organization from './views/Organization';
import Theme from './views/Theme';
import YourProfile from './views/YourProfile';
import Widget from './views/Widget';

const Root = styled(Card)`
	width: 100%;
	height: 100%;
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-columns: ${({ theme }) => theme.sizes[17]} 1fr;
	overflow: hidden;
	transform: translateZ(0);

	@media (min-height: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: ${({ theme }) => theme.sizes[24]};
		max-height: ${({ theme }) => theme.sizes[22]};
		margin-left: ${({theme }) => theme.space[4]};
		margin-right: ${({theme }) => theme.space[4]};
	}

	@media (min-height: ${({ theme }) => theme.breakpoints.md}) {
		max-width: ${({ theme }) => theme.sizes[24]};
		max-height: ${({ theme }) => theme.sizes[22]};
	}
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
`;

const CloseButton = styled(IconButton)`
	position: fixed;
	top: ${({ theme }) => theme.space[7]}; 
	right: ${({ theme }) => theme.space[7]}; 
	z-index: 99;
`;

const Settings = forwardRef(({ onClose }, ref) => {
	return (
		<Root variant="border" ref={ref}>
			<Box>
				<Header paddingX={7} height="headerLg">
					<Text fontSize={6} lineHeight={7} fontWeight={600}>
						Settings
					</Text>
				</Header>
				<Container paddingX={6}>
					<NavigationMenuItem icon={UserIcon} label="Your Profile" to="/settings/your-profile" navigationMethod="replace" />
					<NavigationMenuItem icon={CalendarIcon} label="Availability" to="/settings/availability" navigationMethod="replace" />
					<NavigationMenuItem icon={SettingsIcon} label="Preferences" to="/settings/preferences" navigationMethod="replace" />
					<NavigationMenuItem icon={SwitchThemeIcon} label="Theme" to="/settings/theme" navigationMethod="replace" />
					<NavigationMenuItem icon={OrganizationIcon} label="Organization" to="/settings/organization" navigationMethod="replace" />
					<NavigationMenuItem icon={WidgetIcon} label="Widget" to="/settings/widget" navigationMethod="replace" />
				</Container>
			</Box>
			<Scrollbars>
				<CloseButton variant="filled" onClick={onClose} icon={CloseIcon} />
				<Switch>
					<Route path="/settings/your-profile" component={YourProfile} />
					<Route path="/settings/availability" component={Availability} />
					<Route path="/settings/theme" component={Theme} />
					<Route path="/settings/organization" component={Organization} />
					<Route path="/settings/widget" component={Widget} />
				</Switch>
			</Scrollbars>
		</Root>
	);
});

export default Settings;
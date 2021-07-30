import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Redirect, Route } from 'react-router-dom';
import { themes } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import IconBubble from '@combase.app/ui/IconBubble';
import Label from '@combase.app/ui/Label';
import { ChatsIcon, PluginsIcon } from '@combase.app/ui/icons';
import StreamLogo from '@combase.app/ui/StreamLogo';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

import useCurrentUser from 'hooks/useCurrentUser';

import ResetPassword from './views/ResetPassword';
import ForgotPassword from './views/ForgotPassword';
import Invite from './views/Invite';
import Login from './views/Login';
import Onboarding from './views/Onboarding';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 0.5fr 1fr;
	height: 100vh;
	overflow: hidden;
`;

const SidePanel = styled(Box)`
	display: grid;
	grid-template-rows: min-content 1fr;
`;

const VerticalCenter = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Logo = styled(Box)`
	display: flex;
	align-items: center;
`;

const Page = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-rows: 1fr min-content;
`;

const Credit = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Auth = () => {
	const { data, loading } = useCurrentUser();
	
	if (!loading && data?.me) {
		return <Redirect replace to='/' />
	}

	return (
		<Root>
			<ThemeProvider theme={themes.dark}>
				<SidePanel padding={8} backgroundColor="primary">
					<Logo>
						<Text fontSize={6} lineHeight={6} fontWeight={700}>Combase</Text>
						<Label marginLeft={3} color="red" variant="filled">
							<Text fontWeight="800">
								BETA
							</Text>
						</Label>
					</Logo>
					<VerticalCenter>
						<Box marginY={8}>
							<IconBubble icon={ChatsIcon} size={8} color="text" />
							<TextGroup marginTop={2}>
								<Text fontSize={5} lineHeight={5} fontWeight={700}>
									Real-time Conversations
								</Text>
								<Text fontSize={3} lineHeight={5} opacity={0.64}>
									Chat with your customers in real-time to provide on-the-spot assistance and advanced support. 
								</Text>
							</TextGroup>
						</Box>
						<Box marginY={8}>
							<IconBubble icon={PluginsIcon} size={8} color="text" />
							<TextGroup marginTop={2}>
								<Text fontSize={5} lineHeight={5} fontWeight={700}>
									Integrations
								</Text>
								<Text fontSize={3} lineHeight={5} opacity={0.64}>
									Easily connect your favorite tools to improve your team’s efficiency and decrease your time to market.
								</Text>
							</TextGroup>
						</Box>
						<Box marginY={8}>
							<IconBubble icon={StreamLogo} size={8} color="text" />
							<TextGroup marginTop={2}>
								<Text fontSize={5} lineHeight={5} fontWeight={700}>
									Powered By Stream
								</Text>
								<Text fontSize={3} lineHeight={5} opacity={0.64}>
									Reliable customer support experience using Stream’s state-of-the-art Chat and Feeds APIs.
								</Text>
							</TextGroup>
						</Box>
					</VerticalCenter>
				</SidePanel>
			</ThemeProvider>
			<Page>
				<Switch>
					<Route path="/auth/reset-password" component={ResetPassword} />
					<Route path="/auth/forgot" component={ForgotPassword} />
					<Route path="/auth/invite" component={Invite} />
					<Route exact path="/auth/signup" component={Onboarding} />
					<Route exact path="/auth/login" component={Login} />
					<Route exact path="/auth" render={() => <Redirect replace to='/auth/login' />} />
				</Switch>
				<Credit paddingY={7}>
					<Text 
						color="altText"
						fontSize={3}
						lineHeight={5}
					>
						© 2021 • Stream.io Inc. All Rights Reserved.
					</Text>
				</Credit>
			</Page>
		</Root>
	);
};

export default Auth;
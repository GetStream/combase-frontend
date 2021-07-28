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

import Login from './views/Login';
import Onboarding from './views/Onboarding';

const Root = styled(Box)`
	display: grid;
	grid-template-columns: 0.5fr 1fr;
	height: 100vh;
	overflow: hidden;
`;

const Logo = styled(Box)`
	display: flex;
	align-items: center;
`;

const Auth = () => {
	const { data, loading } = useCurrentUser();
	
	if (!loading && data?.me) {
		return <Redirect replace to='/' />
	}

	return (
		<Root>
			<ThemeProvider theme={themes.dark}>
				<Box padding={8} backgroundColor="primary">
					<Logo>
						<Text fontSize={6} lineHeight={6} fontWeight={700}>Combase</Text>
						<Label marginLeft={3} color="red" variant="filled">
							<Text fontWeight="800">
								BETA
							</Text>
						</Label>
					</Logo>
					{/* <Box marginTop={8}>
						<Text fontSize={4} fontWeight={500} lineHeight={6} opacity={0.64}>
							Build & nurture customer relationships through 1:1 realtime conversations with Combase, powered by Stream Chat.
						</Text>
					</Box> */}
					<Box marginY={8}>
						<IconBubble icon={ChatsIcon} size={8} color="text" />
						<TextGroup marginTop={2}>
							<Text fontSize={5} lineHeight={5} fontWeight={700}>
								Realtime Conversations
							</Text>
							<Text fontSize={3} lineHeight={5} opacity={0.64}>
								Build & nurture customer relationships through 1:1 realtime conversations with Combase, powered by Stream Chat.
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
								Build & nurture customer relationships through 1:1 realtime conversations with Combase, powered by Stream Chat.
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
								Build & nurture customer relationships through 1:1 realtime conversations with Combase, powered by Stream Chat.
							</Text>
						</TextGroup>
					</Box>
				</Box>
			</ThemeProvider>
			<Switch>
				<Route exact path="/auth/signup" component={Onboarding} />
				<Route exact path="/auth/login" component={Login} />
				<Route exact path="/auth" render={() => <Redirect replace to='/auth/login' />} />
			</Switch>
		</Root>
	);
};

export default Auth;
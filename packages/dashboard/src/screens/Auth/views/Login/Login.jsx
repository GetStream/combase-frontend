import React from 'react';
import styled from 'styled-components';

import Container from '@combase.app/ui/Container';
import {Heading} from '@combase.app/ui/Text';
import StreamLogo from '@combase.app/ui/StreamLogo';

import LoginForm from './LoginForm';

const Root = styled(Container).attrs({
	variant: 'contained',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Login = () => {
	return (
		<Root>
			<StreamLogo size={8} />
			<Heading 
				fontSize={5} 
				fontWeight={700}
				lineHeight={5} 
				marginBottom={5} 
			>
				Welcome to Combase
			</Heading>
			<LoginForm />
		</Root>
	);
};

export default Login;
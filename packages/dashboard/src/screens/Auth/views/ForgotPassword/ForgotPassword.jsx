import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Container from '@combase.app/ui/Container';
import {Heading} from '@combase.app/ui/Text';
import {MailIcon} from '@combase.app/ui/icons';
import StreamLogo from '@combase.app/ui/StreamLogo';

import PasswordResetForm from './PasswordResetForm';

const Root = styled(Container).attrs({
	variant: 'contained',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;


const ForgotPassword = () => {
	return (
		<Root>
			<StreamLogo size={8} />
			<Heading 
				fontSize={5}
				fontWeight={700}
				lineHeight={5}
				marginBottom={8}
			>
				Forgot your password?
			</Heading>
			<PasswordResetForm />
		</Root>
	);
};

export default ForgotPassword;
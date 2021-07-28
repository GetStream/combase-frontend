import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { itemGap } from '@combase.app/styles';
import { useHistory } from 'react-router-dom';

import { LOGIN, setAuthenticationCredentials } from 'apollo/operations';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

const Root = styled(Box)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	& > * + * {
		${itemGap}
	}
`;

const initialValues = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const history = useHistory();
	const [handleLogin, { loading } ] = useMutation(LOGIN);

	const handleSubmit = useCallback(async (variables) => {
		try {
			await handleLogin({
				variables,
				update: (_, { data: { agent } }) => {
					setAuthenticationCredentials(agent.token);
					history.push('/');
				}
			})
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				formik => (
					<Root
						as={Form} 
						maxWidth={19} 
						onSubmit={formik.handleSubmit}
						gapTop={3}
					>
						<TextInput 
							name="email" 
							label="Email"
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange} 
							onFocus={formik.handleFocus} 
							value={formik.values.email} 
						/>
						<TextInput 
							label="Password" 
							name="password" 
							type="password"
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange} 
							onFocus={formik.handleFocus} 
							value={formik.values.password} 
						/>
						<Button 
							loading={loading}
							marginTop={8}
							type="submit"
						>
							<Text color="white">Log in</Text>
						</Button>
					</Root>
				)
			}
		</Formik>
	);
};

export default LoginForm 
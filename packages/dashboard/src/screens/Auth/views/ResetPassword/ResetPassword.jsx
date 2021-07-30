import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import{ useMutation } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { itemGap } from '@combase.app/styles';
import queryString from 'query-string';
import jwt from 'jwt-decode'

import { RESET_PASSWORD } from 'apollo/operations';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import EmptyView from '@combase.app/ui/EmptyView';
import StreamLogo from '@combase.app/ui/StreamLogo';
import Text, { Heading } from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

const Root = styled(Container).attrs({
	variant: 'contained',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FormRoot = styled(Box)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	& > * + * {
		${itemGap}
	}
`;

const ResetPassword = () => {
	const history = useHistory();
	const { search } = useLocation();
	const [resetPassword, { loading }] = useMutation(RESET_PASSWORD); // TODO: Update Password.

	useEffect(() => {
		return () => localStorage.removeItem('combase-organization');
	}, []);

	const resetInvitation = useMemo(() => {
		const {token} = queryString.parse(search);

		if (token) {
			const payload = jwt(token);
			if (payload.exp < (Date.now() / 1000)) {
				return 'expired';
			}
			localStorage.setItem('combase-organization', payload.org);
			
			return payload;
		}
		
		return token;
	}, [search]);

	const initialValues = useMemo(() => {
		return {
			_id: resetInvitation?.sub,
			confirm: '',
			password: ''
		};
	}, [resetInvitation]);

	const isExpired = resetInvitation === 'expired';

	const handleSubmit = useCallback(async (values) => {
		try {
			await resetPassword({
				variables: {
					_id: values._id,
					password: values.password,
				}
			});
			history.push('/auth/login');
		} catch (error) {
			console.log(error.message);
		}
	}, [resetPassword, history]);

	if (!resetInvitation || isExpired) {
		return (
			<Root>
				<EmptyView
					width="100%"
					maxWidth={22}
					title={isExpired ? "Password Reset Link Expired." : "Something went wrong!"}
				/>
			</Root>
		);
	}

	return (
		<Root>
			<StreamLogo size={8} />
			<Heading 
				fontSize={5} 
				fontWeight={700}
				lineHeight={5} 
				marginBottom={5} 
			>
				Reset your password
			</Heading>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{
					(formik) => (
						<FormRoot 
							as={Form}
							maxWidth={19}
							onSubmit={formik.handleSubmit}
							gapTop={3}
						>
							<TextInput 
								autoComplete="off"
								name="password"
								label="New Password"
								type="password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.password}
							/>
							<TextInput 
								autoComplete="off"
								name="confirm"
								label="Confirm Password"
								type="password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.confirm}
							/>
							<Button 
								loading={loading}
								type="submit"
							>
								<Text color="white">Reset Password</Text>
							</Button>
						</FormRoot>
					)
				}
			</Formik>
		</Root>
	);
};

export default ResetPassword;
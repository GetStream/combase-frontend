import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { itemGap } from '@combase.app/styles';
import { Link, useHistory } from 'react-router-dom';

import { REQUEST_PASSWORD_RESET } from 'apollo/operations';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Text from '@combase.app/ui/Text';
import { CloseCircleIcon, MailIcon } from '@combase.app/ui/icons';
import TextLink from '@combase.app/ui/TextLink';
import TextInput from '@combase.app/ui/TextInput';
import StateDisplay from '@combase.app/ui/StateDisplay';

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

const PasswordResetForm = () => {
	const history = useHistory();
	const [requestPasswordReset, { loading, data, error } ] = useMutation(REQUEST_PASSWORD_RESET, { fetchPolicy: 'no-cache' });
	const [errorMsg, setErrorMsg] = useState();

	const handleSubmit = useCallback(async (variables) => {
		try {
			await requestPasswordReset({
				variables
			});
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	if (loading || data?.agent) {
		return <StateDisplay loading={loading} icon={MailIcon} size={7} text={null}>
			{loading ? null : <Text fontSize={6} lineHeight={7} fontWeight={700}>Check your inbox!</Text>}
			{loading ? null : <TextLink as={Link} to="/auth/login" marginTop={5}>Back to Login</TextLink>}
		</StateDisplay>
	} 	

	if (!loading && (error || errorMsg)) {
		return <StateDisplay icon={CloseCircleIcon} size={7} text={null}>
			{loading ? null : <Text fontSize={6} lineHeight={7} fontWeight={700}>{errorMsg || 'Something went wrong! Please try again.'}</Text>}
			{loading ? null : <TextLink as={Link} to="/auth/login" marginTop={5}>Back to Login</TextLink>}
		</StateDisplay>
	}

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
						<Button 
							loading={loading}
							type="submit"
						>
							<Text color="white">Send Email</Text>
						</Button>
					</Root>
				)
			}
		</Formik>
	);
};

export default PasswordResetForm 
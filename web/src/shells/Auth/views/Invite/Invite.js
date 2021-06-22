import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import{ CREATE_AGENT, setAuthenticationCredentials, useMutation } from '@combase.app/apollo';
import { Box, EmptyView, PageTitle, Text } from '@combase.app/ui';

import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import jwt from 'jwt-decode'

import FormikWizard from 'components/FormikWizard';

import CreateLogin, { validationSchema as step1Validation } from '../Onboarding/CreateLogin';
import CreateUser, { validationSchema as step2Validation } from '../Onboarding/CreateUser';

const Root = styled.div`
    display: flex;
    flex-direction: column;
`;

const Invite = () => {
	const history = useHistory();
	const { search } = useLocation();
	const [createAgent] = useMutation(CREATE_AGENT);

	useEffect(() => {
		return () => localStorage.removeItem('combase-organization');
	}, []);

	const invitation = useMemo(() => {
		const {token} = queryString.parse(search);

		if (token) {
			const payload = jwt(token);
			localStorage.setItem('combase-organization', payload.org);
			// if (payload.exp < (Date.now() / 1000)) {
			// 	return 'expired';
			// }

			return payload;
		}
		
		return token;
	}, [search]);

	const initialValues = useMemo(() => {
		return {
			agent: {
				avatar: '',
				confirm: '',
				email: invitation?.email ?? '',
				name: {
					first: '',
					last: '',
				},
				password: '',
				organization: invitation?.org ?? '',
				access: invitation?.access ?? '',
			},
		};
	}, [invitation]);

	const isExpired = invitation === 'expired';

	const handleSubmit = useCallback(async (values) => {
		try {
			const { agent: { name, confirm, ...agent } } = values;
			
			const fullName = `${name.first} ${name.last}`;

			const { data: { agentCreate } } = await createAgent({
				variables: {
					record: {
						...agent,
						name: {
							display: fullName,
							full: fullName,
						}
					},
				}
			});
			console.log(agentCreate);
			setAuthenticationCredentials(agentCreate.record.token);
			// history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	}, [createAgent, history]);

	if (!invitation || isExpired) {
		return (
			<EmptyView title={isExpired ? "Invitation Expired." : "Something went wrong!"} />
		);
	}

	return (
		<Root>
			<PageTitle subtitle="Combase" title="Invitation" />
			<Text color="altText" marginY={2}>You've been invited to join <Text as="span" color="primary">Stream</Text> on Combase.</Text>
			<Box paddingY={4}>
				<FormikWizard initialValues={initialValues} onSubmit={handleSubmit}>
					<CreateUser validationSchema={step1Validation} />
					<CreateLogin validationSchema={step2Validation} />
				</FormikWizard>
			</Box>
		</Root>
	);
};

export default Invite;
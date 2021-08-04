import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import{ useMutation } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import jwt from 'jwt-decode'

import { CREATE_AGENT, setAuthenticationCredentials } from 'apollo/operations';

import Box from '@combase.app/ui/Box';
import Container from '@combase.app/ui/Container';
import EmptyView from '@combase.app/ui/EmptyView';
import StreamLogo from '@combase.app/ui/StreamLogo';
import Text, { Heading } from '@combase.app/ui/Text';

import FormikWizard from 'components/FormikWizard';

import CreateLogin, { validationSchema as step1Validation } from '../Onboarding/CreateLogin';
import CreateUser, { validationSchema as step2Validation } from '../Onboarding/CreateUser';

const Root = styled(Container).attrs({
	variant: 'contained',
})`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
			agent: {
				avatar: '',
				confirm: '',
				email: invitation?.email ?? '',
				name: {
					first: '',
					last: '',
				},
				schedule: [{
					enabled: true,
					day: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
					time: [{
						start: {
							hour: 9,
							minute: 0,
						},
						end: {
							hour: 17,
							minute: 30,
						},
					}]
				}],
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

			setAuthenticationCredentials(agentCreate.record.token);
			history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	}, [createAgent, history]);

	if (!invitation || isExpired) {
		return (
			<Root>
				<EmptyView
					width="100%"
					maxWidth={22}
					title={isExpired ? "Invitation Expired." : "Something went wrong!"}
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
				marginBottom={2} 
			>
				Invitation
			</Heading>
			<Text color="altText" marginBottom={8} >You've been invited to join <Text as="span" color="primary">Stream</Text> on Combase.</Text>
			<FormikWizard maxWidth={19} initialValues={initialValues} onSubmit={handleSubmit}>
				<CreateUser validationSchema={step1Validation} />
				<CreateLogin validationSchema={step2Validation} />
			</FormikWizard>
		</Root>
	);
};

export default Invite;
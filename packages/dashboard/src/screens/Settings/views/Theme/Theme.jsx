import React, { useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { Form, Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import Text from '@combase.app/ui/Text';

import { GET_CURRENT_USER, GET_MY_PROFILE } from 'apollo/operations/auth';
import { UPDATE_AGENT } from 'apollo/operations/agent';

import {DialogFooter} from 'components/Dialog';
import HeaderBase from 'components/HeaderBase';
import AccentSelector from 'components/AccentSelector';
import ThemeSelector from 'components/ThemeSelector';
import FormikCancelButton from 'components/FormikCancelButton';

const Root = styled(Box)`
	height: 100%;
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
`;

const Footer = styled(DialogFooter)`
	position: sticky;
	bottom: 0;
	border: 0;
	padding: ${({ theme }) => theme.space[7]};
	background-color: ${({ theme }) => theme.colors.surface};
`;

const Theme = () => {
	const theme = useTheme();
	const {data} = useQuery(GET_MY_PROFILE);
	const [updateAgent, { loading }] = useMutation(UPDATE_AGENT);

	const initialValues = useMemo(() => ({
		preferences: {
			uitheme: data?.me?.preferences?.uitheme || 'system'
		},
		theme: {
			color: data?.me?.theme?.color || theme.colors.primary,
		}
	}), [data]);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateAgent({
				variables: {
					_id: data.me._id,
					record: {
						preferences: values.preferences,
						theme: values.theme,
					}
				},
				refetchQueries: [{ query: GET_CURRENT_USER }]
			});
			toast.dark('Theme preferences updated.');
		} catch (error) {
			toast.error(error.message);
		}
	}, [data]);

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
			{
				(formik) => (
					<Root as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Theme
							</Text>
						</Header>
						<Container minHeight="calc(100% - 200px)" paddingX={7}>
							<Text marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								UI Theme
							</Text>
							<ThemeSelector name="preferences.uitheme" onChange={formik.handleChange} value={formik.values.preferences.uitheme} />
							<Text marginTop={10} marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								Accent Color
							</Text>
							<AccentSelector name="theme.color" onChange={formik.handleChange} value={formik.values.theme.color} />
						</Container>
						<Footer marginTop="auto">
							<FormikCancelButton cancelMsg="Theme changes reset." />
							<Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit">
								<Text color="white">Save</Text>
							</Button>
						</Footer>
					</Root>
				)
			}
		</Formik>
	)
};

export default Theme
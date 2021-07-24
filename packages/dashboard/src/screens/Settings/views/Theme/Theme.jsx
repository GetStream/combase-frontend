import React, { useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import Text from '@combase.app/ui/Text';

import { setUITheme } from 'apollo/operations/ui';
import { themeVar } from 'apollo/variables';

import { GET_MY_PROFILE } from 'apollo/operations/auth';
import { UPDATE_AGENT } from 'apollo/operations/agent';

import {DialogFooter} from 'components/Dialog';
import HeaderBase from 'components/HeaderBase';
import AccentSelector from 'components/AccentSelector';
import ThemeSelector from 'components/ThemeSelector';

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
	const themeMode = useReactiveVar(themeVar);

	const initialValues = useMemo(() => ({
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
						theme: values.theme,
					}
				}
			})
		} catch (error) {
			console.error(error.message);
		}
	}, [data]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				(formik) => (
					<Root as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Theme
							</Text>
						</Header>
						<Container paddingX={7}>
							<Text marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								UI Theme
							</Text>
							<ThemeSelector name="uitheme" onChange={setUITheme} value={themeMode} />
							<Text marginTop={10} marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								Accent Color
							</Text>
							<AccentSelector name="theme.color" onChange={formik.handleChange} value={formik.values.theme.color} />
						</Container>
						<Footer marginTop="auto">
							<Button color="altText" variant="flat">
								<Text color="altText">Cancel</Text>
							</Button>
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
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import TextGroup from '@combase.app/ui/TextGroup';
import Text from '@combase.app/ui/Text';

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

const Widget = () => {
	const initialValues = useMemo(() => ({

	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			console.log(values);
		} catch (error) {
			console.error(error.message);
		}
	}, []);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				(formik) => (
					<Root as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Widget
							</Text>
						</Header>
						<Container paddingX={7}>
							<Text marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								Customize
							</Text>
							<ThemeSelector name="uitheme" />
							<Text marginTop={10} marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								Accent Color
							</Text>
							<AccentSelector name="theme.color" onChange={formik.handleChange} />
							<TextGroup marginTop={8}>
								<Text fontSize={4} lineHeight={7} fontWeight={500}>
									Unassigned Message Flow
								</Text>
								<Text fontSize={3} lineHeight={6} fontWeight={400} maxWidth={19} opacity={0.56}>
									Set the message(s) that will be sent to end-users in the event that no agents are currently available.
								</Text>
							</TextGroup>
							<TextGroup marginTop={8}>
								<Text fontSize={4} lineHeight={7} fontWeight={500}>
									Restrict Paths
								</Text>
								<Text fontSize={3} lineHeight={6} fontWeight={400} maxWidth={19} opacity={0.56}>
									Restrict the widget to only display on certain paths. If empty the widget will show for all paths.
								</Text>
							</TextGroup>
							<TextGroup marginTop={8}>
								<Text fontSize={4} lineHeight={7} fontWeight={500}>
									Embed Code
								</Text>
								<Text fontSize={3} lineHeight={6} fontWeight={400} maxWidth={19} opacity={0.56}>
									Use the embed code below to install the Combase chat widget in your site.
								</Text>
							</TextGroup>
						</Container>
						<Footer marginTop="auto">
							<Button color="altText" variant="flat">
								<Text color="altText">Cancel</Text>
							</Button>
							<Button type="submit">
								<Text color="white">Save</Text>
							</Button>
						</Footer>
					</Root>
				)
			}
		</Formik>
	)
};

export default Widget;
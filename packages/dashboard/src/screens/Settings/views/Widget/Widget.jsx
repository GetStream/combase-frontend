import React, { useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { FieldArray, Form, Formik } from 'formik';
import { useMutation, useQuery } from "@apollo/client";
import { toast } from 'react-toastify';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import IconButton from '@combase.app/ui/IconButton';
import { AddCircleIcon, DeleteIcon } from '@combase.app/ui/icons';
import TextGroup from '@combase.app/ui/TextGroup';
import TextLink from '@combase.app/ui/TextLink';
import {ChipInputBase} from '@combase.app/ui/shared/ChipInputBase';
import TextInput from '@combase.app/ui/TextInput';
import Text from '@combase.app/ui/Text';
import Tooltip from '@combase.app/ui/Tooltip';

import {DialogFooter} from 'components/Dialog';
import HeaderBase from 'components/HeaderBase';
import AccentSelector from 'components/AccentSelector';
import ThemeSelector from 'components/ThemeSelector';

import { GET_WIDGET_SETTINGS, UPDATE_WIDGET_SETTINGS } from 'apollo/operations/auth';

const Root = styled(Box)`
	height: 100%;
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
`;

const FieldArrayInput = styled(Box)`
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-gap: ${({ theme }) => theme.space[4]};
	max-width: ${({ theme }) => theme.sizes[20]};

	& + & {
		margin-top: ${({theme}) => theme.space[2]};
	}
`;

const IconWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Footer = styled(DialogFooter)`
	position: sticky;
	bottom: 0;
	border: 0;
	padding: ${({ theme }) => theme.space[7]};
	background-color: ${({ theme }) => theme.colors.surface};
`;

const PathsInput = styled(Box)`
	border-radius: ${({ theme }) => theme.radii[3]};
	border: 1px solid ${({ theme }) => theme.colors.border};
	min-height: ${({ theme }) => theme.sizes[14]};
`;

const Widget = () => {
	const theme = useTheme();

	const {data} = useQuery(GET_WIDGET_SETTINGS);
	const [updateWidget, { loading }] = useMutation(UPDATE_WIDGET_SETTINGS);
	
	const organization = data?.organization;
	const widget = data?.organization.widget;
	const initialValues = useMemo(() => ({
		uitheme: widget?.uitheme || 'system',
		accent: widget?.accent || theme.colors.primary,
		unassignedMessages: widget?.unassignedMessages || [''],
		paths: widget?.paths || []
	}), [widget]);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateWidget({
				variables: {
					_id: organization._id,
					record: {
						widget: values,
					}
				}
			});
			toast.dark('Widget settings updated.');
		} catch (error) {
			toast.error(error.message);
		}
	}, [organization]);

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
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
							<ThemeSelector mode="widget" onChange={(value) => formik.setFieldValue('uitheme', value)} value={formik.values.uitheme} />
							<Text marginTop={10} marginBottom={4} color="altText" fontSize={4} fontWeight="400" lineHeight={4}>
								Accent Color
							</Text>
							<AccentSelector name="accent" onChange={formik.handleChange} value={formik.values.accent} />
							<TextGroup marginTop={8}>
								<Text fontSize={4} lineHeight={7} fontWeight={500}>
									Unassigned Message Flow
								</Text>
								<Text fontSize={3} lineHeight={6} fontWeight={400} maxWidth={19} opacity={0.56}>
									Set the message(s) that will be sent to end-users in the event that no agents are currently available.
								</Text>
							</TextGroup>
							<Box paddingY={5}>
								<FieldArray 
									name="unassignedMessages"
									render={arrayHelpers => {
										return (
											<>
												{
													formik.values.unassignedMessages.map((message, index) => (
														<FieldArrayInput>
															<TextInput 
																label={`Message ${index + 1}`} 
																name={`unassignedMessages.${index}`} 
																onBlur={formik.handleBlur}
																onChange={formik.handleChange}
																onFocus={formik.handleFocus}
																value={message} 
															/>
															<IconWrapper>
																<Tooltip text="Delete Message">
																	<IconButton 
																		icon={DeleteIcon} 
																		color="border"
																		size={4}
																		onClick={() => arrayHelpers.remove(index)}
																	/>
																</Tooltip>
															</IconWrapper>
														</FieldArrayInput>
													))
												}
												<TextLink marginY={4} onClick={() => arrayHelpers.push('')} color="primary" icon={AddCircleIcon}>Add Message</TextLink>
											</>
										);
									}}
								/>
							</Box>
							<TextGroup marginTop={4}>
								<Text fontSize={4} lineHeight={7} fontWeight={500}>
									Restrict Paths
								</Text>
								<Text fontSize={3} lineHeight={6} fontWeight={400} maxWidth={19} opacity={0.56}>
									Restrict the widget to only display on certain paths. If empty the widget will show for all paths. You can leave this blank to allow all paths
								</Text>
							</TextGroup>
							<PathsInput marginY={4}>
								<ChipInputBase 
									name="paths" 
									placeholder="e.g. /contact"
									transformValue={value => value.startsWith('/') ? value : `/${value}`}
									onBlur={formik.handleBlur} 
									onChange={formik.handleChange} 
									onFocus={formik.handleFocus} 
									value={formik.values.paths}
								/>
							</PathsInput>
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

export default Widget;
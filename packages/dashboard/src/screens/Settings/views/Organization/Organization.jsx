import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';
import { Form, Formik } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

import { GET_ORGANIZATION_PROFILE, UPDATE_ORGANIZATION_PROFILE } from 'apollo/operations/auth';

import AvatarInput from 'components/AvatarInput';
import {DialogFooter} from 'components/Dialog';
import HeaderBase from 'components/HeaderBase';
import FormikCancelButton from 'components/FormikCancelButton';

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: none;
`;

const FormWrapper = styled(Container)`
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-gap: ${({ theme }) => theme.space[8]};
`;

const StickyWrapper = styled(Box)`
	position: sticky;
	top: ${({ theme }) => theme.sizes.headerLg};
`;

const InputGroup = styled(Box)`
	& > * + * {
		${itemGap};
	}
`;

const Footer = styled(DialogFooter)`
	position: sticky;
	bottom: 0;
	border: 0;
	padding-top: ${({ theme }) => theme.space[5]};
	padding-bottom: ${({ theme }) => theme.space[5]};
	padding-left: ${({ theme }) => theme.space[7]};
	padding-right: ${({ theme }) => theme.space[7]};
	background-color: ${({ theme }) => theme.colors.surface};
`;

const Organization = () => {
	const avatarInputRef = useRef();

	const { data } = useQuery(GET_ORGANIZATION_PROFILE);
	const [updateOrganization, { loading }] = useMutation(UPDATE_ORGANIZATION_PROFILE);
	const organization = data?.organization;

	const initialValues = useMemo(() => ({
		branding: {
			logo: organization?.branding.logo ?? ""	
		},
		name: organization?.name ?? "",
		contact: {
			phone: organization?.contact.phone ?? "",
			email: organization?.contact.email ?? "",
		}
	}), [organization]);
	
	const handleSubmit = useCallback(async (values) => {
		try {
			await updateOrganization({
				variables: {
					_id: organization._id,
					record: values
				},
			});
			toast.dark(`Organization settings updated.`);
		} catch (error) {
			toast.error(error);
		}
	}, [organization])

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
			{
				formik => (
					<Box as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Organization
							</Text>
						</Header>
						<FormWrapper as={Form} onSubmit={formik.handleSubmit} paddingX={7} paddingBottom={5}>
							<Box>
								<InputGroup gapTop={6}>
									<TextInput 
										label="Name" 
										name="name"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										onFocus={formik.handleFocus}
										value={formik.values.name}
									/>
								</InputGroup>
								<InputGroup marginY={9} gapTop={4}>
									<Text fontSize={4} lineHeight={4} fontWeight={600}>
										Primary Contact
									</Text>
									<TextInput 
										label="Contact Email" 
										name="contact.email"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										onFocus={formik.handleFocus}
										value={formik.values.contact.email}
									/>
									<TextInput 
										label="Contact Phone" 
										name="contact.phone"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										onFocus={formik.handleFocus}
										value={formik.values.contact.phone}
									/>
								</InputGroup>
							</Box>
							<Box>
								<StickyWrapper>
									<AvatarInput 
										ref={avatarInputRef} 
										src={formik.values.branding.logo} 
										name={formik.values.name} 
										onChange={(avatar) => formik.setFieldValue('branding.logo', avatar)}
										size={15} 
									/>
									<InputGroup marginTop={4} gapTop={2}>
										<Button onClick={() => avatarInputRef.current.click()} color="primary" variant="flat">
											<Text color="primary">Change Photo</Text>
										</Button>
										<Button color="red" variant="flat" onClick={() => formik.setFieldValue('branding.logo', null)}>
											<Text color="red">Remove Photo</Text>
										</Button>
									</InputGroup>
								</StickyWrapper>
							</Box>
						</FormWrapper>
						<Footer>
							<FormikCancelButton cancelMsg="Organization changes reset." />
							<Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit">
								<Text color="white">Save</Text>
							</Button>
						</Footer>
					</Box>
				)
			}
		</Formik>
	)
};

export default Organization
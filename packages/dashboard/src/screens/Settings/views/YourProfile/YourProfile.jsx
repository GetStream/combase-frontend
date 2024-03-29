import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { itemGap } from '@combase.app/styles';
import { Formik, Form } from 'formik';
import { useMutation, useQuery } from '@apollo/client';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';
import TimezoneInput from '@combase.app/ui/TimezoneInput';

import { GET_MY_PROFILE } from 'apollo/operations/auth';
import { UPDATE_AGENT } from 'apollo/operations/agent';

import AvatarInput from 'components/AvatarInput';
import {DialogFooter} from 'components/Dialog';
import FormikCancelButton from 'components/FormikCancelButton';
import HeaderBase from 'components/HeaderBase';

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

const ButtonGroup = styled(InputGroup)`
	& button {
		width: 100%;
	}
`;

const Footer = styled(DialogFooter)`
	position: sticky;
	bottom: 0;
	right: 0;
	left: 0;
	border: 0;
	padding-top: ${({ theme }) => theme.space[5]};
	padding-bottom: ${({ theme }) => theme.space[7]};
	padding-left: ${({ theme }) => theme.space[7]};
	padding-right: ${({ theme }) => theme.space[7]};
	background-color: transparent;
	pointer-events: none;

	& button {
		pointer-events: auto;
	}
`;

const YourProfile = () => {
	const { data } = useQuery(GET_MY_PROFILE);
	const [updateAgent, { loading }] = useMutation(UPDATE_AGENT);
	
	const me = data?.me;
	const organization = data?.organization;
	
	const avatarInputRef = useRef(null);

	const initialValues = useMemo(() => ({
		avatar: me?.avatar ?? "",
		name: {
			full: me?.name?.full ?? "",
			display: me?.name?.display ?? "",
		},
		role: me?.role ?? "",
		timezone: me?.timezone ?? "",
		email: me?.email ?? "",
	}), [me]);
	
	const handleSubmit = useCallback(async (values) => {
		try {
			await updateAgent({
				variables: {
					_id: me._id,
					record: values
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [me]);

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
			{
				formik => (
					<Box as={Form} onSubmit={formik.handleSubmit}>
						<Header paddingX={7} height="headerLg">
							<Text fontSize={5} lineHeight={7} fontWeight={600}>
								Your Profile
							</Text>
						</Header>
						<FormWrapper minHeight="calc(100% - 200px)" paddingX={7} paddingBottom={5}>
							<Box>
								<InputGroup gapTop={6}>
									<TextInput 
										label="Full Name" 
										name="name.full"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										onFocus={formik.handleFocus}
										value={formik.values.name.full}
									/>
									<Box>
										<TextInput 
											label="Display Name"
											name="name.display"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											onFocus={formik.handleFocus}
											value={formik.values.name.display}
										/>
										<Text color="altText" paddingY={2} fontSize={2} fontWeight={400} lineHeight={3}>This is the name that will appear for you when in conversation with end-users, and around the Combase Interface.</Text>
									</Box>
								</InputGroup>
								<InputGroup marginY={9} gapTop={6}>
									<Box>
										<TextInput 
											label="Role" 
											name="role"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											onFocus={formik.handleFocus}
											value={formik.values.role}
										/>
										<Text color="altText" paddingY={2} fontSize={2} fontWeight={400} lineHeight={3}>Let end-users know what you do at {organization?.name}.</Text>
									</Box>
									<Box>
										<TimezoneInput 
											label="Timezone"
											name="timezone"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											onFocus={formik.handleFocus}
											value={formik.values.timezone}
										/>
										<Text color="altText" paddingY={2} fontSize={2} fontWeight={400} lineHeight={3}>Setting your timezone allows Combase to accurately route chats for your <Link to="/settings/availability">Availability Schedule</Link>.</Text>
									</Box>
								</InputGroup>
								<InputGroup marginY={9} gapTop={6}>
									<Box>
										<TextInput 
											label="Email" 
											name="email"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											onFocus={formik.handleFocus}
											value={formik.values.email}
										/>
										<Text color="altText" paddingY={2} fontSize={2} fontWeight={400} lineHeight={3}>Changing your email address requires verification, check your inbox after hitting save.</Text>
									</Box>
								</InputGroup>
							</Box>
							<Box>
								<StickyWrapper>
									<AvatarInput 
										borderRadius={[7, 7, 8]} 
										name={formik.values.name.display} 
										onChange={avatar => formik.setFieldValue('avatar', avatar)} 
										ref={avatarInputRef}
										size={[15, 15, 16]} 
										src={formik.values.avatar} 
									/>
									<ButtonGroup marginTop={4} gapTop={2}>
										<Button width="100%" onClick={() => avatarInputRef.current.click()} color="primary" variant="flat">
											<Text color="primary">Change Photo</Text>
										</Button>
										<Button width="100%" onClick={() => formik.setFieldValue('avatar', null)} color="red" variant="flat">
											<Text color="red">Remove Photo</Text>
										</Button>
									</ButtonGroup>
								</StickyWrapper>
							</Box>
						</FormWrapper>
						<Footer>
							<FormikCancelButton cancelMsg="Profile changes reset." />
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

export default YourProfile
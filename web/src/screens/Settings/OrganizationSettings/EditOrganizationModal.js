import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation, useQuery, GET_ORGANIZATION_PROFILE, UPDATE_ORGANIZATION_PROFILE } from '@combase.app/apollo';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { Avatar, Box, Button, Card, Container, Heading, Modal, ListSubheader, CloseCircleIcon, Text, TextInput, TextLink } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';

import UpdateAvatarDialog from 'components/modals/UpdateAvatarDialog';

const Root = styled(Card).attrs({
	as: 'form',
})`
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	display: grid;
	grid-template-rows: min-content 1fr min-content;

	@media (min-height: calc(${({ theme }) => theme.sizes[20]} + 4rem)) {
		max-height: ${({ theme }) => theme.sizes[20]};
	}
`;

const AvatarWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`

const Footer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1px solid ${({ theme }) => theme.colors.border};

	& button + button {
		${itemGap}
	}
`;

const Fields = styled(Box).attrs({
	paddingY: 2
})`
	& > * + * {
		${itemGap}
	}
`;

const queryOpts = { fetchPolicy: 'cache-and-network'};

const EditOrganizationModal = forwardRef(({ onClose }, ref) => {
	const fileInputRef = useRef();
	const [avatarFile, setAvatarFile] = useState(null);
	const { data } = useQuery(GET_ORGANIZATION_PROFILE, queryOpts);
	const [updateOrganizationProfile, { loading }] = useMutation(UPDATE_ORGANIZATION_PROFILE);
	const { addToast } = useToasts();

	const organization = data?.organization;

	const initialValues = useMemo(() => ({
		name: organization?.name || '',
		contact: {
			phone: organization?.contact?.phone || '',
			email: organization?.contact?.email || '',
		},
		branding: {
			logo: organization?.branding?.logo || '',
		},
	}), [organization]);

	const handleSubmit = useCallback(async ({ security, ...values}) => {
		try {
			await updateOrganizationProfile({
				update: (cache, { data: { organizationUpdate } }) => {
					const org = organizationUpdate.record;

					 cache.writeFragment({
						data: org,
						fragment: gql`
							fragment UpdateOrganization on Organization {
								name
								branding {
									logo
									colors {
										primary
									}
								}
								contact {
									phone
									email
								}
							}
						`,
					});
				},
				variables: {
					_id: data.organization._id,
					record: values,
				}
			});
			onClose();
			addToast('Saved Organization profile.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [addToast, data, onClose, updateOrganizationProfile]);

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
	});

	const handleAvatarChange = useCallback(e => {
		let [newFile] = e.target.files;
        if (newFile) {
			setAvatarFile({
				...newFile,
                preview: URL.createObjectURL(newFile),
            });
        }
    }, []);

	return (
		<Root ref={ref} minWidth={18} onSubmit={formik.handleSubmit}>
			<Box paddingX={5} paddingTop={7} paddingBottom={4}>
				<Heading fontSize={5} lineHeight={5}>
					Edit Organization
				</Heading>
			</Box>
			<ScrollContainer>
				<AvatarWrapper marginY={4}>
					<Avatar 
						src={formik.values.branding.logo} 
						size={12} 
						onClick={() => fileInputRef.current.click()} 
						marginBottom={6}
					/>
					<Button onClick={() => fileInputRef.current.click()} size="xs" color="altText">
						<Text color="white">
							Update Avatar
						</Text>
					</Button>
					<TextLink marginY={2} color="error" icon={CloseCircleIcon} reverse onClick={() => formik.setFieldValue('branding.logo', null)}>
						Remove Avatar
					</TextLink>
					<input ref={fileInputRef} onChange={handleAvatarChange} type="file" style={{display: 'none'}} />
					<Modal
						open={!!avatarFile} 
						file={avatarFile} 
						name="branding.logo"
						onSubmit={formik.handleChange}
						onClose={() => setAvatarFile(null)} 
						component={UpdateAvatarDialog} 
					/>
				</AvatarWrapper>
				<Box marginY={4}>
					<ListSubheader>
						Profile Information
					</ListSubheader>
					<Fields gapTop={2}>
						<TextInput 
							label="Name" 
							name="name"
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange} 
							onFocus={formik.handleFocus} 
							value={formik.values.name}
						/>
					</Fields>
				</Box>
				<Box marginY={4}>
					<ListSubheader>
						Primary Contact
					</ListSubheader>
					<Fields gapTop={2}>
						<TextInput 
							label="Phone" 
							name="contact.phone"
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange} 
							onFocus={formik.handleFocus} 
							value={formik.values.contact.phone}
						/>
						<TextInput 
							label="Email" 
							name="contact.email"
							onBlur={formik.handleBlur} 
							onChange={formik.handleChange} 
							onFocus={formik.handleFocus} 
							value={formik.values.contact.email}
						/>
					</Fields>
				</Box>
			</ScrollContainer>
			<Footer backgroundColor="background" gapLeft={3} padding={4}>
				<Button variant="flat" color="altText" onClick={onClose} type="button">
					<Text color="altText">Cancel</Text>
				</Button>
				<Button loading={loading} type="submit">
					<Text color="white">Save Changes</Text>
				</Button>
			</Footer>
		</Root>
	)
});

export default EditOrganizationModal;
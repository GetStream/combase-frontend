import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { gql, useMutation, useQuery, GET_ORGANIZATION_PROFILE, UPDATE_ORGANIZATION_PROFILE } from '@combase.app/apollo';
import { layout } from '@combase.app/styles';
import { useToasts } from 'react-toast-notifications';
import { useDropzone } from 'react-dropzone';
import Scrollbars from 'rc-scrollbars';

import { AddImageIcon, Avatar, Box, Container, FormikAutosave, LabelledCheckbox, ListDetailSection, Text, TextInput } from '@combase.app/ui';

const AvatarRow = styled(Box)`
	display: grid;
	grid-template-columns: min-content 1fr;
	grid-column-gap: ${({ theme }) => theme.space[5]};
`;

const InputGroup = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    grid-column-gap: ${({ theme }) => theme.space[5]};
    grid-row-gap: ${({ theme }) => theme.space[5]};

    & > div:nth-child(n + 3) {
        grid-row: 3;
    }
`;

const Dropzone = styled(Box)`
    ${layout};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    user-select: none;
    cursor: pointer;
	border: 2px dashed ${({ theme }) => theme.colors.border};
	background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.border, .04)};
`;

const OrganizationSettings = () => {
	const { data } = useQuery(GET_ORGANIZATION_PROFILE, { fetchPolicy: 'cache-and-network'});
	const [updateOrganizationProfile, { loading, error }] = useMutation(UPDATE_ORGANIZATION_PROFILE);
	const { addToast } = useToasts();

	const initialValues = useMemo(
		() => ({
			name: data?.organization?.name || '',
			contact: {
				phone: data?.organization?.contact?.phone || '',
				email: data?.organization?.contact?.email || '',
			},
			security: {
				global2Fa: true
			}
		}),
		[data]
	);

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

			addToast('Saved.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [data]);

	const handleDrop = useCallback(acceptedFiles => {
        let newFile = acceptedFiles[0];

        if (newFile) {
            // setFile({
            //     ...newFile,
            //     preview: URL.createObjectURL(newFile),
            // });
        }
    }, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({ onDrop: handleDrop, multiple: false });

	return (
		<Scrollbars>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formik => (
					<Container paddingY={6} maxWidth={22}>
						<ListDetailSection title="Brand" description="Customize your organizations logo, colors and more to white-label Combase and customize how you appear in the widget.">
							<AvatarRow marginBottom={6}>
								<Box>
									<Avatar name={formik.values.name} size={12} />
								</Box>
								<Box>
									<Dropzone {...getRootProps()} borderRadius={2} paddingX={3} height={13} backgroundColor="textA.2">
										<AddImageIcon color="altText" size={8} />
										<Text marginTop={2} fontSize={3} lineHeight={4}>
											Click to replace
										</Text>
										<Text fontSize={3} lineHeight={5} color="altText">or drag and drop</Text>
										<Text fontSize={2} lineHeight={2} color="altText" marginTop={2} fontWeight={400}>PNG, JPG or SVG</Text>
										<input {...getInputProps()} />
									</Dropzone>
								</Box>
							</AvatarRow>
							<InputGroup>
								<div>
									<TextInput
										label="Name"
										name="name"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.name}
									/>
								</div>
								<div>
									<TextInput
										label="Primary Color"
										name="colors.primary"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.colors?.primary}
									/>
								</div>
							</InputGroup>
						</ListDetailSection>
						<ListDetailSection title="Primary Contact" description="Set the primary contact information for your organization (this will not be shown publicly to your end-users)">
							<InputGroup>
								<div>
									<TextInput
										label="Contact Email"
										name="contact.email"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.contact.email}
									/>
								</div>
								<div>
									<TextInput
										label="Contact Phone"
										name="contact.phone"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.contact.phone}
									/>
								</div>
							</InputGroup>
						</ListDetailSection>
						<ListDetailSection title="Security" description="Configure the default security settings at the Organization level, to be applied to all agent accounts.">
							<LabelledCheckbox name="security.global2Fa" onBlur={formik.handleBlur} onChange={formik.handleChange} checked={formik.values.security.global2Fa} title="Two Factor Authentication">
								<Text color="altText">Globally enforce 2FA for all Agent Users in your organization.</Text>
							</LabelledCheckbox>
						</ListDetailSection>
						<FormikAutosave />
					</Container>
				)}
			</Formik>
		</Scrollbars>
	)
};

export default OrganizationSettings;
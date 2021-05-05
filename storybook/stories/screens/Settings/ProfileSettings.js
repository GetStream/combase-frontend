import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { gql, useMutation, useQuery, GET_MY_PROFILE, UPDATE_AGENT_PROFILE_FRAGMENT } from '@combase.app/apollo';
import { useToasts } from 'react-toast-notifications';
import { useDropzone } from 'react-dropzone';

import { Avatar, AddImageIcon, Box, Container, FormikAutosave, ListDetailSection, Modal, ScheduleInput, Text, TextInput, UpdateAvatarDialog } from '@combase.app/ui';
import { layout } from '@combase.app/styles';

const AvatarRow = styled(Box)`
	display: grid;
	grid-template-columns: min-content 1fr;
	grid-column-gap: ${({ theme }) => theme.space[5]};
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

const InputGroup = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    grid-column-gap: ${({ theme }) => theme.space[5]};
    grid-row-gap: ${({ theme }) => theme.space[5]};

    & > div:nth-child(n + 3) {
        grid-row: 2;
    }
`;

const UPDATE_USER_DATA = gql`
    mutation updateProfile($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            record {
                _id
                name {
                    full
                    display
                }
                email
                role
                timezone
            }
        }
    }
`;

const ProfileSettings = () => {
	const { data } = useQuery(GET_MY_PROFILE);
	const [updateUser, { error, loading }] = useMutation(UPDATE_USER_DATA);
	const { addToast } = useToasts();
	const [avatarFile, setAvatarFile] = useState(null);
	
	const handleDrop = useCallback(acceptedFiles => {
		let newFile = acceptedFiles[0];
		
        if (newFile) {
			setAvatarFile({
				...newFile,
                preview: URL.createObjectURL(newFile),
            });
        }
    }, []);
	

	const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({ accept: 'image/jpeg, image/png, image/svg+xml', onDrop: handleDrop, multiple: false });

	const initialValues = useMemo(
		() => ({
			avatar: data?.me?.avatar || '',
			email: data?.me?.email || '',
			name: {
				display: data?.me?.name?.display || '',
				full: data?.me?.name?.full || '',
			},
			role: data?.me?.role || '',
			timezone: data?.me?.timezone || '',
			schedule: data?.me?.schedule || [
				{
					day: [],
					time: [{}],
				},
			],
		}),
		[data]
	);

	const handleSubmit = useCallback(async ({ security, ...values}) => {
		try {
			const schedule = values.schedule.map(({__typename, ...v}) => ({
                ...v,
                time: v.time.map(({ start, end }) => {
                    const [startHour, startMinute] = start.split(':');
                    const [endHour, endMinute] = end.split(':');

                    return {
                        start: {
                            hour: parseInt(startHour, 10),
                            minute: parseInt(startMinute, 10),
                        },
                        end: {
                            hour: parseInt(endHour, 10),
                            minute: parseInt(endMinute, 10),
                        },
                    };
                }),
            }));

			await updateUser({
				update: (cache, { data: { agentUpdate } }) => {
					const agent = agentUpdate.record;
					 cache.writeFragment({
						data: agent,
						fragment: UPDATE_AGENT_PROFILE_FRAGMENT,
					});
				},
				variables: {
					_id: data.me._id,
					record: {
						...values,
						schedule,
					},
				}
			});

			addToast('Saved.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			console.log(error);
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [data]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{formik => (
				<Container variant="fluid">
					<ListDetailSection title="Your Profile" description="Customize your profile information and how you will appear in conversations with end-users on Combase.">
						<AvatarRow marginBottom={6}>
							<Box>
								<Avatar name={formik.values.name?.display} src={formik.values.avatar} size={12} />
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
									label="Full Name"
									name="name.full"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.name?.full}
								/>
							</div>
							<div>
								<TextInput
									label="Display Name"
									name="name.display"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.name?.display}
								/>
							</div>
							<div>
								<TextInput
									label="What I Do"
									name="role"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.role}
								/>
							</div>
						</InputGroup>
					</ListDetailSection>
					<ListDetailSection title="Your Availability" description="Customize how you will appear in conversations with end-users on Combase." >
						<ScheduleInput 
							canSave={formik.dirty && formik.isValid}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							onSubmit={formik.handleSubmit}
							name="schedule"
							value={formik.values.schedule}
						/>
					</ListDetailSection>
					<ListDetailSection title="Two Factor Authentication" description="Secure your account with 2FA." />
					<Modal 
						backdrop 
						open={!!avatarFile} 
						file={avatarFile} 
						name="avatar"
						onSubmit={formik.handleChange}
						onClose={() => setAvatarFile(null)} 
						component={UpdateAvatarDialog} 
					/>
					<FormikAutosave />
				</Container>
			)}
		</Formik>
	)
};

export default ProfileSettings;
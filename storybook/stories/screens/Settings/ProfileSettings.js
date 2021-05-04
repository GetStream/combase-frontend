import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { gql, useMutation, useQuery, GET_MY_PROFILE } from '@combase.app/apollo';
import { useToasts } from 'react-toast-notifications';

import { Box, Container, FormikAutosave, ListDetailSection, ScheduleInput, TextInput } from '@combase.app/ui';

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

	const initialValues = useMemo(
		() => ({
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
						fragment: gql`
							fragment UpdateAgentProfile on Agent {
								name {
									first
									display
								}
								role
								email
								schedule {
									enabled
									day
									time {
										start: startTime
										end: endTime
									}
								}
								timezone
							}
						`,
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
					<FormikAutosave />
				</Container>
			)}
		</Formik>
	)
};

export default ProfileSettings;
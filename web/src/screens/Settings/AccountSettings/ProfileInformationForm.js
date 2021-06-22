import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useToasts } from 'react-toast-notifications';

import { 
	Avatar,
	Box,
	Button,
	Container,
	ListDetailSection,
	TextInput,
	TimezoneInput,
	Text,
} from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';
import { gql, useMutation, useQuery, GET_MY_PROFILE, AGENT_PROFILE_FRAGMENT } from '@combase.app/apollo';

const AvatarWrapper = styled(Box)`
	display: flex;
	justify-content: center;
`;

const Fields = styled(Box)`
	& > * + * {
		${itemGap}
	}
`;

const FormFooter = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const UPDATE_USER_DATA = gql`
	${AGENT_PROFILE_FRAGMENT}
    mutation updateProfile($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            record {
                ...AgentProfile
            }
        }
    }
`;

const ProfileInformationForm = (props) => {
	const { data } = useQuery(GET_MY_PROFILE);
	const [updateUser, { loading }] = useMutation(UPDATE_USER_DATA);
	const { addToast } = useToasts();

	const initialValues = useMemo(
		() => ({
			avatar: data?.me?.avatar || '',
			name: {
				display: data?.me?.name?.display || '',
				full: data?.me?.name?.full || '',
			},
			role: data?.me?.role || '',
			timezone: data?.me?.timezone || '',
		}),
		[data]
	);

	const handleSubmit = useCallback(async (values) => {
		try {
			// const schedule = values.schedule.map(({__typename, ...v}) => ({
            //     ...v,
            //     time: v.time.map(({ start, end }) => {
            //         const [startHour, startMinute] = start.split(':');
            //         const [endHour, endMinute] = end.split(':');

            //         return {
            //             start: {
            //                 hour: parseInt(startHour, 10),
            //                 minute: parseInt(startMinute, 10),
            //             },
            //             end: {
            //                 hour: parseInt(endHour, 10),
            //                 minute: parseInt(endMinute, 10),
            //             },
            //         };
            //     }),
            // }));

			await updateUser({
				optimisticResponse: {
					__typename: 'Mutation',
					agentUpdate: {
						record: {
							_id: data.me._id,
							...values,
							__typename: 'Agent',
						},
						__typename: 'UpdateByIdAgentPayload',
					},
				},
				update: (cache, { data: { agentUpdate } }) => {
					const agent = agentUpdate.record;
					console.log(agent);
					 cache.writeFragment({
						data: agent,
						fragment: AGENT_PROFILE_FRAGMENT,
					});
				},
				variables: {
					_id: data.me._id,
					record: values,
				}
			});

			addToast('Saved your profile.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [addToast, data, updateUser]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{formik => (
				<Container as={Form} onSubmit={formik.handleSubmit} {...props}>
					<ListDetailSection title="Your Profile" description="Customize your profile information and how you will appear in conversations with end-users on Combase.">
						<Fields gapTop={2}>
							<AvatarWrapper marginBottom={8}>
								<Avatar src={data?.me.avatar} size={12} />
							</AvatarWrapper>
							<TextInput 
								label="Full Name"
								name="name.full"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.name.full}
							/>
							<TextInput 
								label="Display Name"
								name="name.display"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.name.display}
							/>
							<TextInput 
								label="What You Do"
								name="role"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.role}
							/>
							<TimezoneInput 
								label="Timezone"
								name="timezone"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								onFocus={formik.handleFocus}
								value={formik.values.timezone}
							/>
						</Fields>
						<FormFooter marginTop={6}>
							<Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit">
								<Text color="white">
									Save Changes
								</Text>
							</Button>
						</FormFooter>
					</ListDetailSection>
				</Container>
			)}
		</Formik>
	);
}

export default ProfileInformationForm;
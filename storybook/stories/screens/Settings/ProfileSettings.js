import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { gql, useMutation, useQuery, GET_MY_PROFILE } from '@combase.app/apollo';

import { Box, Container, ListDetailSection, TextInput } from '@combase.app/ui';

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
	const [handleUpdateUser, { error, loading }] = useMutation(UPDATE_USER_DATA);

	const initialValues = useMemo(
		() => ({
			email: data?.me?.email || '',
			name: {
				display: data?.me?.name?.display || '',
				full: data?.me?.name?.full || '',
			},
			role: data?.me?.role || '',
			timezone: data?.me?.timezone || '',
		}),
		[data]
	);

	return (
		<Container variant="fluid">
			<ListDetailSection title="Your Profile" description="Customize your profile information and how you will appear in conversations with end-users on Combase.">
				<Formik enableReinitialize initialValues={initialValues} onSubmit={console.log}>
					{formik => (
						<Form onSubmit={formik.handleSubmit}>
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
						</Form>
					)}
				</Formik>
			</ListDetailSection>
			<ListDetailSection title="Your Availability" description="Customize how you will appear in conversations with end-users on Combase." />
			<ListDetailSection title="Two Factor Authentication" description="Secure your account with 2FA." />
		</Container>
	)
};

export default ProfileSettings;
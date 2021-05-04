import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { gql, useMutation, useQuery, GET_ORGANIZATION_PROFILE } from '@combase.app/apollo';
import { useToasts } from 'react-toast-notifications';

import { Box, Container, LabelledCheckbox, ListDetailSection, Text, TextInput } from '@combase.app/ui';

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

const OrganizationSettings = () => {
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);
	const { addToast, removeAllToasts } = useToasts();

	const initialValues = useMemo(
		() => ({
			name: data?.organization?.name || '',
			contact: {
				phone: data?.organization?.contact?.phone || '',
				email: data?.organization?.contact?.email || '',
			}
		}),
		[data]
	);

	useEffect(() => {
		addToast('There was an issue saving your profile changes.', {
			appearance: 'warning',
			autoDismiss: true,		
		})

		return () => {
			removeAllToasts();
		}
	}, [])

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={console.log}>
			{formik => (
				<Container as={Form} onSubmit={formik.handleSubmit} variant="fluid">
					<ListDetailSection title="Brand" description="Customize your organizations logo, colors and more to white-label Combase and customize how you appear in the widget.">
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
						<LabelledCheckbox title="Two Factor Authentication">
							<Text color="altText">Globally enforce 2FA for all Agent Users in your organization.</Text>
						</LabelledCheckbox>
					</ListDetailSection>
				</Container>
			)}
		</Formik>
	)
};

export default OrganizationSettings;
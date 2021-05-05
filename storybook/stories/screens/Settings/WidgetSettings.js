import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Formik } from 'formik';
import { useQuery, GET_ORGANIZATION_PROFILE } from '@combase.app/apollo';

import { AddCircleIcon, Box, CloseCircleIcon, Container, FormikAutosave, IconButton, ListDetailSection, TextInput } from '@combase.app/ui';

const FieldArrayInput = styled(Box)`
	display: grid;
	grid-template-columns: 1fr min-content;

	& + & {
		margin-top: ${({ theme }) => theme.space[4]};
	}
`;

const ArrayActions = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	min-width: ${({ theme }) => theme.sizes[11]};
`;

const Pre = styled(Box).attrs({
	as: 'pre',
})`
	border: 1px solid ${({ theme }) => theme.colors.border};
	font-family: ${({ theme }) => theme.fonts.code};
	font-size: ${({ theme }) => theme.fontSizes[2]};
`

const initialValues = {
	welcomeMessages: ['Hey 👋', 'Thanks for reaching out!', 'How can we help you today?'],
	trustedDomains: ['localhost']
}

const renderFieldArray = ({ form: { handleBlur, handleChange, handleFocus, values }, name, push, remove }) => {
	const value = values[name];
	return value.map((v, i) => (
		<FieldArrayInput key={`${name}-${i}`}>
			<TextInput label={`${i + 1}`} name={`${name}.${i}`} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} value={v} />
			<ArrayActions padding={2}>
				{i > 0 || i === 0 && value.length > 1 ? (
					<IconButton color={'red'} size={4} icon={CloseCircleIcon} onClick={() => remove(i)} />
				) : null}
				{i === value.length - 1 ? (
					<IconButton color={'text'} size={4} icon={AddCircleIcon} onClick={() => push('')} />
				) : null}
			</ArrayActions>
		</FieldArrayInput>
	));
}

const WidgetSettings = () => {
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);
	return (
		<Formik initialValues={initialValues} onSubmit={console.log}>
			{
				formik => (
					<Container variant="fluid">
						<ListDetailSection
							title="Welcome Message"
							description="Edit the message, or series of messages, that an end-user will receive upon starting a new conversation."
						>
							<FieldArray 
								name="welcomeMessages"
								render={renderFieldArray}
							/>
						</ListDetailSection>
						<ListDetailSection
							title="Trusted Domains"
							description="Provide a list of whitelisted domains for the chat widget, so it can only be displayed on your owned pages."
						>
							<FieldArray 
								name="trustedDomains"
								render={renderFieldArray}
							/>
						</ListDetailSection>
						<ListDetailSection
							title="Embed Code"
							description="Grab a customized embed code for your Chat Widget. Just paste the script tag into your website."
						>
							<Pre padding={3} borderRadius={2}>
								{"<script></script>"}
							</Pre>
						</ListDetailSection>
					</Container>
				)
			}
		</Formik>
	)
};

export default WidgetSettings;
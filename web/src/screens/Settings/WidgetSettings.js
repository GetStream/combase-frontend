import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FieldArray, Formik } from 'formik';
import Scrollbars from 'rc-scrollbars';
import { useToasts } from 'react-toast-notifications';
import { useQuery, useMutation, GET_WIDGET_SETTINGS, UPDATE_WIDGET_SETTINGS } from '@combase.app/apollo';

import { AddCircleIcon, Box, CloseCircleIcon, Container, IconButton, ListDetailSection, Text, TextInput, ToggleGroup, ToggleGroupOption } from '@combase.app/ui';

import FormikAutosave from 'components/FormikAutosave';

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

const Pre = styled(Text).attrs({
	as: 'pre',
})`
	border: 1px solid ${({ theme }) => theme.colors.border};
	font-family: ${({ theme }) => theme.fonts.code};
	font-size: ${({ theme }) => theme.fontSizes[2]};
`

const renderFieldArray = ({ form: { handleBlur, handleChange, handleFocus, values }, name, push, remove }) => {
	const value = values[name];
	return value.map((v, i) => (
		<FieldArrayInput key={`${name}-${i}`}>
			<TextInput placeholder={`${i + 1}`} name={`${name}.${i}`} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus} value={v} />
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

const queryOpts = { fetchPolicy: 'cache-and-network'};

const WidgetSettings = () => {
	const { data } = useQuery(GET_WIDGET_SETTINGS, queryOpts);
	const [updateWidgetSettings] = useMutation(UPDATE_WIDGET_SETTINGS);
	const { addToast } = useToasts();

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateWidgetSettings({
				variables: {
					_id: data.organization._id,
					record: {
						widget: values
					},
				}
			})
			addToast('Saved widget settings.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}, [addToast, data, updateWidgetSettings]);

	const initialValues = useMemo(() => {
		const { widget } = data?.organization || {};
		return {
			defaultTheme: widget?.defaultTheme || 'auto',
			welcomeMessages: widget?.welcomeMessages?.length ? widget.welcomeMessages :  [''],
			unassignedMessages: widget?.unassignedMessages?.length ? widget.unassignedMessages :  [''],
			home: {
				title: widget?.home?.title || '',
				tagline: widget?.home?.tagline || '',
			},
			domains: widget?.domains?.length ? widget.domains : [''],
		}
	}, [data]);

	return (
		<Scrollbars>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{
					formik => (
						<Container paddingY={6} maxWidth={22}>
							<ListDetailSection
								title="Theme"
								description="Edit the UI theme of the widget (if you have a custom organization theme, those colors will propagate to the widget too.)"
							>
								<ToggleGroup name='defaultTheme' onChange={(value) => formik.setFieldValue('defaultTheme', value)} value={formik.values.defaultTheme}>
									<ToggleGroupOption value="auto">{'Auto'}</ToggleGroupOption>
									<ToggleGroupOption value="light">{'Light'}</ToggleGroupOption>
									<ToggleGroupOption value="dark">{'Dark'}</ToggleGroupOption>
								</ToggleGroup>
							</ListDetailSection>
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
								title="Unassigned Message"
								description="Edit the message, or series of messages, that an end-user will receive when no agents are available."
							>
								<FieldArray 
									name="unassignedMessages"
									render={renderFieldArray}
								/>
							</ListDetailSection>
							<ListDetailSection
								title="Trusted Domains"
								description="Provide a list of whitelisted domains for the chat widget, so it can only be displayed on your owned pages."
							>
								<FieldArray 
									name="domains"
									render={renderFieldArray}
								/>
							</ListDetailSection>
							<ListDetailSection
								title="Embed Code"
								description="Grab a customized embed code for your Chat Widget. Just paste the script tag into your website."
							>
								<Pre padding={3} borderRadius={1}>
									{`<script>
  config({ theme: ${formik.values.defaultTheme}, trustedDomains: ${JSON.stringify(formik.values.domains)} })
</script>`}
								</Pre>
							</ListDetailSection>
							<FormikAutosave />
						</Container>
					)
				}
			</Formik>
		</Scrollbars>
	)
};

export default WidgetSettings;
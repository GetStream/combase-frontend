import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Box, Button, EmptyView, Heading, Switch, Spinner, Placeholder, Text, TextGroup, TextInput } from '@combase.app/ui';
import { layout } from '@combase.app/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useQuery, useMutation, CREATE_INTEGRATION, LOOKUP_INTEGRATION, TOGGLE_INTEGRATION } from '@combase.app/apollo';
import useIntegrationDefinition from 'hooks/useIntegrationDefinition';

const Root = styled(Box)`

`;

const Header = styled(Box)`
	${layout};
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ConfigurationForm = () => {
	const params = useParams();
    const integrationId = params.integrationId;

	const [integration] = useIntegrationDefinition(integrationId);
	const enabled = integration?.integrationData?.enabled;
	
	const [createIntegration, { loading: creating, error: createError }] = useMutation(CREATE_INTEGRATION);
	const [toggleIntegration, { loading: toggling, error: toggleError }] = useMutation(TOGGLE_INTEGRATION);
	const configuration = integration?.configuration;

	const fields = useMemo(() => {
		if (!configuration) {
			return [];
		}
		return Object.entries(configuration).map(([name, opts]) => ({
			name,
			label: opts.label || '',
			placeholder: opts.placeholder || '',
			type: opts.inputType || '',
		}))
	}, [configuration]);

	const initialValues = useMemo(() => {
		let obj = {};
		fields.forEach(({ name }) => {
			const config = configuration[name];
			obj[name] = config.initialValue;
			if (!obj[name]) {
				switch (config.type) {
					case 'String':
					default:
						obj[name] = '';
				}
			}
		});

		return obj;
	}, [configuration, fields]);

	const validationSchema = useMemo(() => {
		let obj = {};
		Object.entries(configuration || {}).forEach(([name, { required, type }]) => {
			switch (type) {
				case 'String':
				default:
					if (required) {
						obj[name] = yup.string().required();
					} else {
						obj[name] = yup.string();
					}
			}
		});

		return yup.object().shape(obj);
	}, [configuration]);

	const handleSubmit = useCallback(async (value) => {
		try {
			await createIntegration({
				variables: {
					uid: integration.id,
					credentials: Object.entries(value).map(([name, value]) => ({ name, value })),
				}
			})
		} catch (error) {
			console.error(error.message);
		}
	}, [integration, createIntegration]);

	const handleToggle = useCallback(async (e) => {
		if (toggling || !integration?.integrationData) {
			return;
		}
		try {
			await toggleIntegration({
				optimisticResponse: {
					__typename: 'Mutation',
					integration: {
						_id: integration?.integrationData?._id,
						enabled: !enabled,
						__typename: 'Integration',
					},
				},
				refetchQueries: [{ query: LOOKUP_INTEGRATION, variables: { uid: integrationId } }],
				variables: {
					_id: integration?.integrationData?._id,
					enabled: !enabled
				}
			})
		} catch (error) {
			console.error(error.message);
		}
	}, [integration, integrationId, enabled, toggleIntegration, toggling]);

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema,
		validateOnMount: true,
	});

	return (
		<Root paddingTop={10}>
			<Header minHeight={10}>
				<Heading fontSize={5} lineHeight={5} fontWeight="800">
					Configuration Settings
				</Heading>
				<Switch disabled={!integration?.integrationData && !formik.isValid} name="enabled" onChange={handleToggle} value={enabled}  />
			</Header>
			{
				!integration?.integrationData ? fields.length ? (
					<Box as="form" paddingY={6} onSubmit={formik.handleSubmit}>
						{fields.map((field, i) => <TextInput key={i} {...field} onBlur={formik.handleBlur} onChange={formik.handleChange} onFocus={formik.handleFocus} value={formik.values[field.name]} />)}
						<Box marginTop={4}>
							<Button type="submit" disabled={!formik.isValid}><Text>Save</Text></Button>
						</Box>
					</Box>
				) : <EmptyView title="No configuration required." /> : (
					<Box>
						{
							integration?.integrationData?.credentials?.map?.(({ name }) => (
								<TextGroup key={name} marginY={4} gapTop={2}>
									<Text  fontSize={3} lineHeight={3}>
										{name}
									</Text>
									<Text  fontSize={2} lineHeight={2} opacity={0.56} fontWeight="600">
										*********************
									</Text>
								</TextGroup>
							))
						}
					</Box>
				)
			}
		</Root>
	);
}

export default ConfigurationForm;
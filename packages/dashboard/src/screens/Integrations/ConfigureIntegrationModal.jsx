import React, { forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Card from '@combase.app/ui/Card';
import Container from '@combase.app/ui/Container';
import { CheckCircleIcon, CloseIcon, CloseCircleIcon, InfoIcon } from '@combase.app/ui/icons';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';
import TextLink from '@combase.app/ui/TextLink';
import TextInput from '@combase.app/ui/TextInput';

import { formatDateFromNow } from 'utils/formatDate';
import useIntegrationDefinition from 'hooks/useIntegrationDefinition';
import { CREATE_INTEGRATION, GET_INTEGRATION_DEFINITION, TOGGLE_INTEGRATION, UNLINK_INTEGRATION } from 'apollo/operations/integration';

const Root = styled(Card)`
	width: 100%;
	max-height: calc(100vh - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	max-width: calc(100vw - ${({ theme }) => theme.space[4] } - ${({ theme }) => theme.space[4] });
	overflow-y: scroll;
	transform: translateZ(0);

	@media (min-height: ${({ theme }) => theme.breakpoints.sm}) {
		max-width: ${({ theme }) => theme.sizes[21]};
		max-height: ${({ theme }) => theme.sizes[22]};
		margin-left: ${({theme }) => theme.space[4]};
		margin-right: ${({theme }) => theme.space[4]};
	}
`;

const Header = styled(Container)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const Content = styled(Container)`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	flex-direction: column;
	& > * + * {
		margin-top: ${({ theme }) => theme.space[4]};
	}
`;

const Subheading = styled(Text)`
	text-transform: uppercase;
	letter-spacing: ${({ theme }) => theme.space[1]};
`;

const Centered = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const CloseButton = styled(IconButton)`
	position: fixed;
	top: ${({ theme }) => theme.space[7]}; 
	right: ${({ theme }) => theme.space[7]}; 
	z-index: 99;
`;

const SubmitWrapper = styled(Container)`
	position: sticky;
	bottom: 0;	
	display: flex;
	flex-direction: column;
	align-items: stretch;
	background: linear-gradient(to top, ${({ theme }) => theme.colors.surface} 50%, ${({ theme }) => theme.utils.colors.fade(theme.colors.surface, 0)} 100%);
`;

const initialValues = {};

const ConfigureIntegrationModal = forwardRef((props, ref) => {
	const { data } = useIntegrationDefinition(props.id);
	const [createIntegration, { loading }] = useMutation(CREATE_INTEGRATION);
	const [toggleIntegration, { loading: toggling }] = useMutation(TOGGLE_INTEGRATION);
	const [unlinkIntegration, { loading: deleting }] = useMutation(UNLINK_INTEGRATION);

	const configuration = data?.integrationDefinition?.configuration;
	const integrationData = data?.integrationDefinition?.integrationData;

	const fields = useMemo(() => {
		if (!configuration) {
			return [];
		}
		return Object.entries(configuration).map(([name, opts]) => ({
			name,
			label: opts.label || '',
			placeholder: opts.placeholder || '',
			type: opts.inputType || '',
			disabled: opts.external || false,
		}))
	}, [configuration]);

	const validationSchema = useMemo(() => {
		let fields = Object.entries(configuration || {});
		let obj = {};
		
		if (!fields.length) {
			return undefined;
		}

		fields.forEach(([name, { required, type }]) => {
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
	console.log(validationSchema)
	const handleSubmit = useCallback(async (values) => {
		try {
			console.log(values);
			// await createIntegration({
			// 	refetchQueries: [{ query: GET_INTEGRATION_DEFINITION, variables: { id: props.id } }],
			// 	variables: {
			// 		uid: props.id,
			// 		credentials: Object.entries(values).map(([name, value]) => ({ name, value })),
			// 	}
			// });
		} catch (error) {
			console.error(error.message);
		}
	}, [props.id]);

	const handleActivate = useCallback(async () => {
		try {
			await toggleIntegration({
				refetchQueries: [{ query: GET_INTEGRATION_DEFINITION, variables: { id: props.id } }],
				variables: {
					enabled: true,
					_id: integrationData?._id
				}
			});
		} catch (error) {
			console.error('failed to activate', error.message);
		}
	}, [props.id, integrationData]);

	const handleDeactivate = useCallback(async () => {
		try {
			await toggleIntegration({
				refetchQueries: [{ query: GET_INTEGRATION_DEFINITION, variables: { id: props.id } }],
				variables: {
					enabled: false,
					_id: integrationData?._id
				}
			});
		} catch (error) {
			console.error('failed to deactivate', error.message);
		}
	}, [props.id, integrationData]);
	
	const handleUnlink = useCallback(async () => {
		try {
			await unlinkIntegration({
				refetchQueries: [{ query: GET_INTEGRATION_DEFINITION, variables: { id: props.id } }],
				variables: {
					_id: integrationData?._id
				}
			});
		} catch (error) {
			console.error('failed to deactivate', error.message);
		}
	}, [props.id, integrationData]);

	return (
		<Root variant="border" ref={ref}>
			<CloseButton variant="filled" onClick={props.onClose} icon={CloseIcon} />
			<Header paddingX={7} paddingY={10}>
				<Avatar size={13} variant="circle" />
				<Text fontSize={5} lineHeight={7} marginTop={5} maxWidth={18}>
					Connect {data?.integrationDefinition?.name} to your Combase Organization.
				</Text>
				<Text marginTop={8} color="primary" fontSize={4} lineHeight={6}>Sync Combase events with Google Analytics and track visits, and widget interactions in your reports.</Text>
			</Header>
			{
				integrationData || fields.length === 0 ? (
					<>
						<Content paddingX={7}>
							<TextGroup gapTop={3} variant="centered">
								<IconLabel gap={2} color={integrationData?.enabled ? "green" : "red"}>
									{integrationData?.enabled ? <CheckCircleIcon size={5} /> : <CloseCircleIcon size={5} />}
									<Text fontSize={5} lineHeight={5}>
										{integrationData?.enabled ? "Enabled" : "Disabled"}
									</Text>
								</IconLabel>
								{
									integrationData?.updatedAt ? (
										<Text color="altText" fontSize={3} lineHeight={4}>
											Activated on: {formatDateFromNow(integrationData?.updatedAt)}
										</Text>
									) : null
								}
							</TextGroup>
							{!integrationData?.enabled && fields.length ? (
								<Centered marginBottom={6}>
									<TextLink 
										reverse 
										color="red" 
										icon={CloseIcon}
										onClick={handleUnlink}
									>
										Unlink Credentials
									</TextLink>
								</Centered>
							) : null}
						</Content>
						<SubmitWrapper paddingY={7} paddingX={7}>
							<Button 
								color={!integrationData?.enabled ? "green" : "red"} 
								loading={toggling} 
								onClick={!integrationData?.enabled ? handleActivate : handleDeactivate}
								variant="flat" 
							>
								<Text
									color={!integrationData?.enabled ? "green" : "red"}
								>
									{!integrationData?.enabled ? "Activate" : "Deactivate"} {data?.integrationDefinition?.name} Plugin
								</Text>
							</Button>
						</SubmitWrapper>
					</>
				) : (
					<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
						{
							formik => (
								<>
									<Content as={Form} onSubmit={formik.handleSubmit} paddingX={7}>
										{
											fields?.length ? (
												<>
													<Subheading color="altText" fontWeight={800}>Configure</Subheading>	
													{fields.map((props) => <TextInput {...props} onBlur={formik.handleBlur} onChange={formik.handleChange} onFocus={formik.handleFocus} value={formik.values[props.name]} />)}
												</>
											) : (
												<Centered>
													<IconLabel color="altText" gap={2}>
														<InfoIcon size={4} />
														<Text fontSize={4} lineHeight={4}>No configuration required.</Text>
													</IconLabel>
												</Centered>
											)
										}
									</Content>
									<SubmitWrapper paddingY={7} paddingX={7}>
										<Button disabled={validationSchema ? (!formik.dirty || !formik.isValid) : false} loading={loading} width="100%" color="primary" type="submit">
											<Text color="white">
												{fields?.length ? `Save and Enable` : `Enable`}
											</Text>
										</Button>
									</SubmitWrapper>
								</>
							)
						}	
					</Formik>
				)			
			}
		</Root>
	);
});

export default ConfigureIntegrationModal;
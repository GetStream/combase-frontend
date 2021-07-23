import React, { forwardRef, useCallback, useMemo } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';

import { UPDATE_AGENT } from 'apollo/operations/agent';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Container from '@combase.app/ui/Container';
import { DeleteIcon } from '@combase.app/ui/icons';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

import Dialog, { DialogFooter } from 'components/Dialog';

import useAgent from 'hooks/useAgent';

const validationSchema = yup.object().shape({
	confirm: yup.string().oneOf(['CONFIRM']).required(),
});

const DeleteAgentDialog = forwardRef(({ agentId, onClose }, ref) => {
	const {data} = useAgent(agentId);
	const organization = data?.organization;
	const agent = organization?.agent;
	const [handleUpdateAgent, { loading }] = useMutation(UPDATE_AGENT);

	const initialValues = useMemo(() => ({
		confirm: '',
	}), [agent]);

	const handleSubmit = useCallback(async () => {
		try {
			await handleUpdateAgent({
				variables: {
					_id: agentId,
					record: {
						archived: true,
					},
				},
				update: (cache, { data }) => {
					const agent = data.agentUpdate.agent;
					const agentRef = cache.identify(agent);
					cache.evict(agentRef);
				}
			});
			onClose();
		} catch (error) {
			console.log(error.message);
		}
	}, [agentId])

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			{
				formik => (
					<Dialog as={Form} onSubmit={formik.handleSubmit} icon={DeleteIcon} ref={ref} title="Delete Agent">
						<Container paddingX={5} paddingY={6}>
							<Text fontSize={4} fontWeight={400} lineHeight={6} maxWidth={19}>
								Are you sure you want to delete {agent?.name.display}'s account? This action is permanent.
							</Text>
							<Box marginTop={6}>
							<TextInput label="Type CONFIRM" name="confirm" onBlur={formik.handleBlur} onChange={formik.handleChange} onFocus={formik.handleFocus} value={formik.values.confirm} />
							</Box>
						</Container>
						<DialogFooter>
							<Button onClick={onClose} color="altText" variant="flat">
								<Text color="altText">Cancel</Text>
							</Button>
							<Button color="error" loading={loading} type="submit" disabled={!formik.dirty || !formik.isValid}>
								<Text color="white">Delete</Text>
							</Button>
						</DialogFooter>
					</Dialog>
				)
			}
		</Formik>
	);
});

export default DeleteAgentDialog;
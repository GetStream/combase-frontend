import React, { forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Box, Button, Container, Helper, Text, TextInput } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';
import { gql, useMutation, useQuery, GET_CURRENT_USER } from '@combase.app/apollo';

import Dialog, { DialogFooter } from 'components/modals/Dialog';

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`

const Fields = styled(Box).attrs({
	paddingY: 2
})`
	& > * + * {
		${itemGap}
	}
`;

const UPDATE_EMAIL_ADDRESS = gql`
    mutation updateProfile($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            record {
                _id
				email
            }
        }
    }
`;

const validationSchema = yup.object().shape({
	current: yup.string().email().required(),
	email: yup.string().email().required(),
	confirmNew: yup.string().email().required(),
})

const EditOrganizationModal = forwardRef(({ onClose }, ref) => {
	const { data } = useQuery(GET_CURRENT_USER);
	const [updateEmailAddress, { loading }] = useMutation(UPDATE_EMAIL_ADDRESS);
	const { addToast } = useToasts();

	const initialValues = useMemo(() => ({
		current: '',
		email: '',
		confirmNew: '',
	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updateEmailAddress({
				optimisticResponse: {
					__typename: 'Mutation',
					agentUpdate: {
						record: {
							_id: data.me._id,
							email: values.email,
							__typename: 'Agent',
						},
						__typename: 'UpdateByIdAgentPayload',
					},
				},
				update: (cache, { data: { agentUpdate } }) => {
					const agent = agentUpdate.record;

					cache.writeFragment({
						data: agent,
						fragment: gql`
							fragment UpdateAgentEmail on Agent {
								email
							}
						`,
					});
				},
				variables: {
					_id: data.me._id,
					record: {
						email: values.email,
					},
				}
			});
			onClose();
			addToast('Updated email address.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [addToast, data, onClose, updateEmailAddress]);

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema,
	});

	return (
		<Dialog as="form" ref={ref} minWidth={18} title="Update Email Address" onSubmit={formik.handleSubmit}>
			<ScrollContainer paddingBottom={4}>
				<Fields gapTop={2}>
					<TextInput 
						label="Current Email" 
						name="current"
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} 
						onFocus={formik.handleFocus} 
						value={formik.values.current}
					/>
					<TextInput 
						label="New Email" 
						name="email"
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} 
						onFocus={formik.handleFocus} 
						value={formik.values.email}
					/>
					<TextInput 
						label="Confirm New Email" 
						name="confirmNew"
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} 
						onFocus={formik.handleFocus} 
						value={formik.values.confirmNew}
					/>
					<Helper paddingX={0} text="You will need to verify your email after changing it" />
				</Fields>
			</ScrollContainer>
			<DialogFooter>
				<Button variant="flat" color="altText" onClick={onClose} type="button">
					<Text color="altText">Cancel</Text>
				</Button>
				<Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit">
					<Text color="white">Submit</Text>
				</Button>
			</DialogFooter>
		</Dialog>
	)
});

export default EditOrganizationModal;
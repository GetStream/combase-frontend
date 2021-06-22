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

const UPDATE_PASSWORD = gql`
    mutation updatePassword($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            record {
                _id
            }
        }
    }
`;

const validationSchema = yup.object().shape({
	password: yup.string().required(),
	confirm: yup.string().required(),
})

const ChangePasswordModal = forwardRef(({ onClose }, ref) => {
	const { data } = useQuery(GET_CURRENT_USER);
	const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);
	const { addToast } = useToasts();

	const initialValues = useMemo(() => ({
		password: '',
		confirm: '',
	}), []);

	const handleSubmit = useCallback(async (values) => {
		try {
			await updatePassword({
				variables: {
					_id: data.me._id,
					record: {
						password: values.password,
					},
				}
			});
			onClose();
			addToast('Updated password.', {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}, [addToast, data, onClose, updatePassword]);

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema,
	});

	return (
		<Dialog as="form" ref={ref} minWidth={18} title="Change Password" onSubmit={formik.handleSubmit}>
			<ScrollContainer paddingBottom={4}>
				<Fields gapTop={2}>
					<TextInput 
						label="Password" 
						name="password"
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} 
						onFocus={formik.handleFocus} 
						value={formik.values.password}
					/>
					<TextInput 
						label="Confirm Password" 
						name="confirm"
						onBlur={formik.handleBlur} 
						onChange={formik.handleChange} 
						onFocus={formik.handleFocus} 
						value={formik.values.confirm}
					/>
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

export default ChangePasswordModal;
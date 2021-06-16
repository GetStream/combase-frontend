import React, { forwardRef, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { CREATE_TAG, GET_CURRENT_USER, NEW_TAG_FRAGMENT, useMutation, useQuery } from '@combase.app/apollo';
import { Button, Container, Text, TextInput, transformToTag } from '@combase.app/ui'
import { useToasts } from 'react-toast-notifications';

import Dialog, { DialogFooter } from 'components/modals/Dialog';

const ScrollContainer = styled(Container).attrs({
	paddingX: 5,
})`
	overflow: scroll;
`

const initialValues = {
	name: "",
};

const AddTagModal = forwardRef(({ onClose }, ref) => {
	const { data } = useQuery(GET_CURRENT_USER);
	const [handleCreateTag, { loading: creating }] = useMutation(CREATE_TAG);
	const { _id: organization } = data?.organization || {};

	const { addToast } = useToasts();

	const handleSubmit = useCallback(
        async values => {
            try {
                const name = transformToTag(values.name);
                await handleCreateTag({
                    optimisticResponse: {
                        tagCreate: {
                            record: {
                                name,
                                organization,
                                __typename: 'Tag',
                            },
                            __typename: 'CreateOneTagPayload',
                        },
                    },
                    variables: {
                        name,
                    },
					update: (cache, { data }) => {
						cache.writeFragment({
							fragment: NEW_TAG_FRAGMENT,
							data: data.tagCreate.record
						});
					}
                });

				onClose();
				
				addToast(`Created tag: ${name}`, {
					appearance: 'success',
					autoDismiss: true,
				});
            } catch (error) {
                addToast(`Error creating tag`, {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(error.message);
            }
        },
        [addToast, handleCreateTag, onClose, organization]
    );

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{
				formik => {
					return (
						<Dialog as={Form} ref={ref} minWidth={18} title="Create Tag" onSubmit={formik.handleSubmit}>
							<ScrollContainer paddingBottom={4}>
								<TextInput 
									label="Name" 
									name="name" 
									onBlur={formik.handleBlur} 
									onChange={formik.handleChange} 
									onFocus={formik.handleFocus} 
									value={formik.values.name}
								/>
							</ScrollContainer>
							<DialogFooter>
								<Button variant="flat" color="altText" onClick={onClose} type="button">
									<Text color="altText">Cancel</Text>
								</Button>
								<Button loading={creating} type="submit">
									<Text color="white">Create</Text>
								</Button>
							</DialogFooter>
						</Dialog>
					)
				}
			}
		</Formik>
	)
});

export default AddTagModal;
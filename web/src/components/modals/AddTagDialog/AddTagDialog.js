import React, { useCallback, useState } from 'react';
import { AddTagIcon, Button, Modal, transformToTag, Text } from '@combase.app/ui';
import { GET_CURRENT_USER, CREATE_TAG, NEW_TAG_FRAGMENT, useMutation, useQuery } from '@combase.app/apollo';
import { useToasts } from 'react-toast-notifications';

import InputDialog from 'components/modals/InputDialog';

const initialValues = {
	name: '',
};

const AddTagDialog = () => {
	const [open, setOpen] = useState();
	const { data } = useQuery(GET_CURRENT_USER);
	const [handleCreateTag, { loading: creating }] = useMutation(CREATE_TAG);

	const { addToast } = useToasts();

	const {organization} = data?.me || {};

	const handleSubmit = useCallback(
        async values => {
            try {
                const name = transformToTag(values.name);
                await handleCreateTag({
                    optimisticResponse: {
                        __typename: 'Mutation',
                        tagCreate: {
                            tag: {
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
                        setOpen(false);
						addToast(`Created tag: ${name}`, {
							appearance: 'success',
							autoDismiss: true,
						});
                    },
                });
            } catch (error) {
                addToast(`Error creating tag`, {
					appearance: 'error',
					autoDismiss: true,
				});
				console.error(error.message);
            }
        },
        [organization]
    );

	return (
		<>
			<Button size="xs" onClick={() => setOpen(true)}>
				<AddTagIcon />
				<Text>Add Tag</Text>
			</Button>
			<Modal
				backdrop
				component={InputDialog}
				initialValues={initialValues}
				label="New tag"
				loading={creating}
				placeholder="Name"
				name="name"
				onClose={() => setOpen(false)}
				onSubmit={handleSubmit}
				open={open}
			/>
		</>
	);
};

export default AddTagDialog;
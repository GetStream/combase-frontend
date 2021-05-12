import { forwardRef, useCallback } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import { layout } from '@combase.app/styles';
import { useMutation, UPDATE_TAG, GET_TAGS } from '@combase.app/apollo';

import Box from '../../Box';
import Button from '../../Button';
import Card from '../../Card';
import { TextInput } from '../../Inputs';
import { Heading, Text } from '../../Text';
import { TagIcon } from '../../icons';

const Root = styled(Card)`
    width: ${({ theme: { sizes } }) => sizes[14]};

    button {
        width: 100%;
    }
`;

const IconBubble = styled(Box)`
    ${layout};
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(Box)`
    ${layout};
    display: grid;
    padding: ${({ theme: { space } }) => space[2]};
    grid-gap: ${({ theme: { space } }) => space[2]};
    grid-template-columns: 1fr 1fr;
`;

export const EditTagDialog = forwardRef(({ helper, initialValues, name, onClose, placeholder }, ref) => {
    const [handleUpdate, { loading }] = useMutation(UPDATE_TAG);

    const onSubmit = useCallback(
        async values => {
            try {
                await handleUpdate({
                    refetchQueries: [{ query: GET_TAGS }],
                    variables: {
                        _id: values._id,
                        record: {
                            name: values.name,
                        },
                    },
                });
                onClose();
            } catch (error) {
                console.error(error.message);
            }
        },
        [onClose]
    );

    return (
        <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
            {formik => (
                <Root as={Form} boxShadow={8} onSubmit={formik.handleSubmit} padding={1} role="dialog" ref={ref}>
                    <Box padding={4}>
                        <IconBubble backgroundColor="primaryA.8" borderRadius="50%" marginBottom={4} size={5}>
                            <TagIcon color="primary" size={4} />
                        </IconBubble>
                        <Heading fontSize={6} lineHeight={6}>
                            Edit Tag
                        </Heading>
                        <Text color="altText" marginTop={1} fontSize={3} fontWeight="600" lineHeight={5}>
                            Update the name for this tag.
                        </Text>
                    </Box>
                    <Box paddingX={3} paddingTop={2}>
                        <TextInput
                            variant="sm"
                            helper={helper}
                            forceFocus
                            label="Name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            focusedPlaceholder={placeholder}
                            name="name"
                        />
                    </Box>
                    <Footer marginTop={4}>
                        <Button color="error" variant="flat" size="sm" onClick={onClose}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit" size="sm">
                            <Text>Confirm</Text>
                        </Button>
                    </Footer>
                </Root>
            )}
        </Formik>
    );
});

import { forwardRef } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import {Box, Button, Card, TextInput, Text} from '@combase.app/ui';
import { layout } from '@combase.app/styles';

const Root = styled(Card)`
    width: ${({ theme: { sizes } }) => sizes[15]};

    button {
        width: 100%;
    }
`;

const Footer = styled(Box)`
    ${layout};
    display: grid;
    padding: ${({ theme: { space } }) => space[2]};
    grid-gap: ${({ theme: { space } }) => space[2]};
    grid-template-columns: 1fr 1fr;
`;

const InputDialog = forwardRef(
    ({ color, helper, initialValues, label, loading, name, onClose, onSubmit, placeholder, submitLabel, validationSchema }, ref) => (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {formik => (
                <Root as={Form} boxShadow={8} onSubmit={formik.handleSubmit} padding={1} role="dialog" ref={ref}>
                    <Box paddingX={3} paddingTop={2}>
                        <TextInput
                            color={color}
                            variant="sm"
                            autoFocus
                            helper={helper}
                            forceFocus
                            label={label}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            focusedPlaceholder={placeholder}
                            name={name}
                            error={formik.errors?.[name]}
                            touched={formik.touched?.[name]}
                            value={formik.values[name]}
                        />
                    </Box>
                    <Footer marginTop={helper ? 0 : 2}>
                        <Button color="error" onClick={onClose} variant="flat" size="sm">
                            <Text>Cancel</Text>
                        </Button>
                        <Button color={color} disabled={!formik.dirty || !formik.isValid} loading={loading} type="submit" size="sm">
                            <Text>{submitLabel || 'Submit'}</Text>
                        </Button>
                    </Footer>
                </Root>
            )}
        </Formik>
    )
);

export default InputDialog
import React from 'react';
import styled from 'styled-components';
import {useFormikContext} from 'formik';
import * as yup from 'yup';

import Button from '@combase.app/ui/Button';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

const Root = styled.div`
    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: .5rem;
    }
`;

const Actions = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
`;

const LinkStreamApp = ({ isLastStep }) => {
    const formik = useFormikContext();

    return (
        <Root>
            <TextInput
                error={formik.touched?.organization?.stream?.key && formik.errors?.organization?.stream?.key}
                label="API Key"
                name="organization.stream.key"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.organization.stream.key}
            />
            <TextInput
                error={formik.touched?.organization?.stream?.secret && formik.errors?.organization?.stream?.secret}
                label="API Secret"
                name="organization.stream.secret"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.organization.stream.secret}
            />
            <TextInput
                error={formik.touched?.organization?.stream?.appId && formik.errors?.organization?.stream?.appId}
                label="App ID"
                name="organization.stream.appId"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.organization.stream.appId}
            />
            <Actions>
                <Button
                    disabled={!formik.dirty || !formik.isValid}
                    type="submit"
                >
                    <Text color="white">{isLastStep ? 'Finish' : 'Next'}</Text>
                </Button>
            </Actions>
        </Root>
    );
};

export const validationSchema = yup.object().shape({
    organization: yup.object().shape({
        stream: yup.object().shape({
            appId: yup.string().required('Required'),
            key: yup.string().required('Required'),
            secret: yup.string().required('Required')
        })
    })
});

export default LinkStreamApp;
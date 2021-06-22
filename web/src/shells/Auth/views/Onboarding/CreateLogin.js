import {VALIDATION_MSG} from 'constants/forms';

import React from 'react';
import styled from 'styled-components';
import {Button, TextInput, Text} from '@combase.app/ui';
import {useFormikContext} from 'formik';
import * as yup from 'yup';

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

const CreateLoginStep = ({ isLastStep }) => {
    const formik = useFormikContext();

    return (
        <Root>
            <TextInput
                error={formik.touched?.agent?.email && formik.errors?.agent?.email}
                label="Email"
                name="agent.email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.agent?.email}
            />
            <TextInput
                error={formik.touched?.agent?.password && formik.errors?.agent?.password}
                helper="Must be at least 8 characters"
                label="Password"
                name="agent.password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.agent?.password}
            />
            <TextInput
                error={formik.touched?.agent?.confirm && formik.errors?.agent?.confirm}
                label="Confirm Password"
                name="agent.confirm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.agent?.confirm}
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
    agent: yup.object().shape({
        avatar: yup.string().url(),
        name: yup.object().shape({
            first: yup.string().required(VALIDATION_MSG.REQUIRED),
            last: yup.string().required(VALIDATION_MSG.REQUIRED)
        })
    })
});

export default CreateLoginStep;

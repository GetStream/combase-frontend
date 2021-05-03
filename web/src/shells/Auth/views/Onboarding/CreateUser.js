import React from 'react';
import styled from 'styled-components';
import {Avatar, Button, TextInput} from '@combase.app/ui';
import {useFormikContext} from 'formik';
import * as yup from 'yup';

import {VALIDATION_MSG} from '../../../../constants/forms';

const Root = styled.div`
    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: .5rem;
    }
`;

const AvatarInput = styled(Avatar)`
    align-self: center;
`;

const Actions = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
`;

const CreateUserStep = () => {
    const formik = useFormikContext();

    return (
        <Root>
            <AvatarInput
                name={formik.values.agent.name.first}
                size={4}
                src={formik.values.agent.avatar}
            />
            <TextInput
                error={formik.touched?.agent?.name?.first && formik.errors?.agent?.name?.first}
                label="First Name"
                name="agent.name.first"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.agent.name?.first}
            />
            <TextInput
                error={formik.touched?.agent?.name?.last && formik.errors?.agent?.name?.last}
                label="Last Name"
                name="agent.name.last"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.agent.name.last}
            />
            <Actions>
                <Button
                    disabled={!formik.dirty || !formik.isValid}
                    type="submit"
                >
                    {'Next'}
                </Button>
            </Actions>
        </Root>
    );
};

export const validationSchema = yup.object().shape({
    agent: yup.object().shape({
        confirm: yup.string().oneOf([yup.ref('password'), null], VALIDATION_MSG.CONFIRM_PASSWORD).required(VALIDATION_MSG.REQUIRED),
        email: yup.string().email(VALIDATION_MSG.INVALID_EMAIL).required(VALIDATION_MSG.REQUIRED),
        password: yup.string().required(VALIDATION_MSG.REQUIRED)
    })
});

export default CreateUserStep;

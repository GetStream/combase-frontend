import React from 'react';
import styled from 'styled-components';
import {useFormikContext} from 'formik';
import * as yup from 'yup';

import Box from '@combase.app/ui/Box';
import Button from '@combase.app/ui/Button';
import Text from '@combase.app/ui/Text';
import TextInput from '@combase.app/ui/TextInput';

import AvatarInput from 'components/AvatarInput';

const Root = styled.div`
    display: flex;
    flex-direction: column;
	width: 100%;

    & > * + * {
        margin-top: .5rem;
    }
`;

const AvatarWrapper = styled(Box)`
	display: flex;
	justify-content: center;
`;

const Actions = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
`;

const CreateUserStep = ({ isLastStep }) => {
    const formik = useFormikContext();

    return (
        <Root maxWidth={19}>
            <AvatarWrapper>
				<AvatarInput
					name={formik.values.agent.name.first}
					size={12}
					value={formik.values.agent.avatar}
				/>
			</AvatarWrapper>
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
                    <Text color="white">{isLastStep ? 'Finish' : 'Next'}</Text>
                </Button>
            </Actions>
        </Root>
    );
};

export const validationSchema = yup.object().shape({
    agent: yup.object().shape({
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
        email: yup.string().email('Invalid email address').required('Required'),
        password: yup.string().required('Required')
    })
});

export default CreateUserStep;
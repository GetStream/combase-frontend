import React from 'react';
import styled from 'styled-components';
import {useFormikContext} from 'formik';
import * as yup from 'yup';

import Avatar from '@combase.app/ui/Avatar';
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

const AvatarInput = styled(Avatar)`
	align-self: center;
`;

const Actions = styled.div`
	margin-top: 1.5rem;
	display: flex;
	flex-direction: column;
`;

const CreateOrganizationStep = ({ isLastStep }) => {
    const formik = useFormikContext();

    return (
        <Root>
            <AvatarInput
                name={formik.values.organization.name || ''}
                size={10}
                src={formik.values.organization.avatar}
            />
            <TextInput
                error={formik.touched?.organization?.name && formik.errors?.organization?.name}
                label="Organization Name"
                name="organization.name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.organization.name}
            />
            {/* <TextInput
                error={formik.touched?.organization?.color && formik.errors?.organization?.color}
                helper="Optional. You can change this later."
                label="Color"
                name="organization.color"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.organization.color}
            /> */}
            <Actions>
                <Button
                    disabled={!formik.dirty || !formik.isValid}
					type='submit'
                >
                    <Text color="white">{isLastStep ? 'Finish' : 'Next'}</Text>
                </Button>
            </Actions>
        </Root>
    );
};

export const validationSchema = yup.object().shape({
    organization: yup.object().shape({
        avatar: yup.string(),
        name: yup.string().required('required')
    })
});

export default CreateOrganizationStep;
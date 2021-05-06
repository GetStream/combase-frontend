import React from 'react';
import styled from 'styled-components';

import { Box } from '../../Layout';

import { InputDialog } from '.';

const Root = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const initialValues = { name: '' };

export const Default = () => {
    return (
        <Root>
            <InputDialog initialValues={initialValues} label="New Group" placeholder="Name" name="name" onSubmit={console.log} />
        </Root>
    );
};

export default {
    component: InputDialog,
    title: 'Modals/InputDialog',
};

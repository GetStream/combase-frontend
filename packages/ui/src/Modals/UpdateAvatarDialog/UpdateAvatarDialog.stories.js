import React from 'react';
import styled from 'styled-components';

import { Box } from '../../Layout';

import { UpdateAvatarDialog } from '.';

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
            <UpdateAvatarDialog />
        </Root>
    );
};

export default {
    component: UpdateAvatarDialog,
    title: 'Modals/UpdateAvatarDialog',
};

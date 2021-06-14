import React from 'react';
import styled from 'styled-components';

import Box from '../../Box';
import PriorityToggle from '.';

const Root = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Priority = () => {
    return <PriorityToggle size={8} />;
};

export default {
    component: PriorityToggle,
    decorators: [
        Story => (
            <Root>
                <Story />
            </Root>
        ),
    ],
    title: 'inputs/Ticket Label Toggles',
};

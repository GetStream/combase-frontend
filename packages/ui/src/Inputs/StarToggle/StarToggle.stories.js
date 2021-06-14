import React from 'react';
import styled from 'styled-components';

import Box from '../../Box';
import StarToggle from '.';

const Root = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Star = () => {
    return <StarToggle size={8} />;
};

export default {
    component: StarToggle,
    decorators: [
        Story => (
            <Root>
                <Story />
            </Root>
        ),
    ],
    title: 'inputs/Ticket Label Toggles',
};

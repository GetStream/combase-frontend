import { useState } from 'react';
import styled from 'styled-components';

import Box from '../../Box';

import { TicketLabelToggle } from '.';

const Root = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const Star = () => {
    const [starred, setStarred] = useState(false);
    return <TicketLabelToggle size={16} type="star" onChange={({ target }) => setStarred(target.checked)} value={starred} />;
};
export const Priority = () => {
    const [priority, setPriority] = useState(0);
    return <TicketLabelToggle size={16} type="priority" onChange={({ target }) => setPriority(target.value)} value={priority} />;
};

export default {
    component: TicketLabelToggle,
    decorators: [
        Story => (
            <Root>
                <Story />
            </Root>
        ),
    ],
    title: 'inputs/TicketLabelToggle',
};

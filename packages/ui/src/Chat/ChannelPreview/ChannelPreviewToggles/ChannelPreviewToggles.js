import styled from 'styled-components';

import { Box } from '../../../Layout';

export default styled(Box).attrs({
    paddingY: 1,
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;

    & button:not(.active) {
        display: none;
    }

    & button + button {
        margin-left: ${({ theme }) => theme.space[2]};
    }
`;

import styled from 'styled-components';

import { Box } from '../../../Layout';

const ChannelPreviewToggles = styled(Box).attrs({
    paddingY: 1,
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;

    & > span:not(.active) {
        display: none;
    }

    & span + span {
        margin-left: ${({ theme }) => theme.space[2]};
    }
`;


export default ChannelPreviewToggles;

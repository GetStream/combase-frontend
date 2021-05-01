import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import { Box } from '../../Layout';

export const InputRoot = styled(Box)`
    ${interactions};
    z-index: 1;
    display: ${({ type }) => (type === 'hidden' ? 'none' : 'flex')};
    flex-direction: row;
    align-items: stretch;
    background-color: ${({ $hasValue, color, theme }) => theme.utils.colors.fade(theme.colors[color], $hasValue ? 0.05 : 0.03)};
    border: 2px solid ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.03)};

    &:hover,
    &:focus-within {
        background-color: ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.05)};
    }
`;
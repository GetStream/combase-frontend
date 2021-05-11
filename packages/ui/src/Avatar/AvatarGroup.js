import styled from 'styled-components';
import { system } from '@combase.app/styles';

import { Box } from '../Layout';

const AvatarGroup = styled(Box)`
    display: grid;
    grid-template-columns: ${({ children }) => `repeat(${children?.length || 1}, min-content)`};
    & > * {
        box-sizing: content-box;
        border: ${({ theme }) => theme.borderWidths[1]} solid ${({ bgColor = 'background', theme }) => theme.colors[bgColor]};
    }

    & > *:not(:first-child) {
        ${system({
            size: {
                property: 'marginLeft',
                scale: 'sizes',
                transform: (value, scale) => `calc((${scale[value]} / 1.25) * -1)`,
            },
        })}
    }
`;

export default AvatarGroup;
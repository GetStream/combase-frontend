import styled from 'styled-components';
import { color, space, system, typography, variant } from '@combase.app/styles';

import Placeholder from '../Placeholder';

export const Text = styled.p`
    margin: 0;
    ${space};
    ${color};
    ${typography};
    ${system({
        fontWeight: {
            property: 'fontVariationSettings',
            scale: 'fontWeights',
            transform: (v, scale) => `'wght' ${scale[v]}`,
        },
    })}
    ${({ lineClamp }) =>
        variant({
            variants: {
                clamped: {
                    display: '-webkit-box',
                    '-webkit-line-clamp': `${lineClamp || 1}`,
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                },
                label: {
                    fontSize: [2, 2, 2, 2, 2, 2, 3],
                    letterSpacing: 0.5,
                    lineHeight: [2, 2, 2, 2, 2, 2, 3],
                },
            },
        })}

	&${Placeholder} {
        border-radius: ${({ theme }) => theme.radii[2]};
    }
`;

Text.defaultProps = {
    as: 'p',
    color: 'text',
    fontFamily: 'text',
    fontSize: 3,
    fontWeight: 500,
    placeholderWidth: 6,
    lineHeight: 4,
};

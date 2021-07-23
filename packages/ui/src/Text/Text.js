import styled from 'styled-components';
import { color, layout, space, system, typography, variant } from '@combase.app/styles';

import Placeholder from '../Placeholder';

const Text = styled.p`
    margin: 0;
    ${space};
    ${color};
    ${typography};
	${layout.maxWidth};
    ${system({
        fontWeight: {
            property: 'fontVariationSettings',
            scale: 'fontWeights',
            transform: (v, scale) => `'wght' ${scale[v]}`,
        },
    })}
    ${({ fontSize, lineClamp }) =>
        variant({
            variants: {
                clamped: {
                    display: '-webkit-box',
                    '-webkit-line-clamp': `${lineClamp || 1}`,
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                },
                label: {
                    fontSize: fontSize || 2,
                    letterSpacing: 0.5,
                    lineHeight: fontSize || 2,
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
    fontSize: 4,
    fontWeight: 500,
    placeholderWidth: 6,
};

export default Text;
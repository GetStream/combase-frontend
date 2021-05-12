import { forwardRef } from 'react';
import styled from 'styled-components';

import Text from '../../../Text';

const Blockquote = styled(Text).attrs({
    as: 'blockquote',
    paddingY: 6,
    paddingX: 7,
})`
    position: relative;
    background-color: ${({ theme }) => theme.utils.colors.darken(theme.colors.primaryA[4], 0.2)};
    border-radius: ${({ theme }) => theme.radii[2]};
    overflow: hidden;
    margin-left: -${({ theme }) => theme.space[7]};
    margin-right: -${({ theme }) => theme.space[7]};

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Quote = forwardRef(({ attributes, nodeProps, ...rest }, ref) => <Blockquote {...rest} fontSize={3} lineHeight={5} marginY={7} {...attributes} {...nodeProps} />);

export default Quote;

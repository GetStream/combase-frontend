import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import IconLabel from '../IconLabel';
import Text from '../Text';
import { ChevronRightIcon } from '../icons/chevronRight';

const Root = styled(IconLabel)`
    ${interactions};
    text-decoration: none;
    user-select: none;
`;

const TextLink = forwardRef(({ as, className, color, children, onClick, size, style, to }, ref) => (
    <Root as={as} className={className} style={style} interaction="opacity" ref={ref} onClick={onClick} to={to}>
        <Text color={color} fontSize={size} lineHeight={size}>{children}</Text>
        <ChevronRightIcon color={color} size={size} />
    </Root>
));

export default TextLink;

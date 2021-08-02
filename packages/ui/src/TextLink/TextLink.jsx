import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';

import Box from '../Box';
import Text from '../Text';
import { ChevronRightIcon } from '../icons';

const Root = styled(Box)`
    ${interactions};
	position: relative;
    text-decoration: none;
    user-select: none;
	display: inline-flex;
	align-items: center;
	margin-right: 1rem;
	& svg {
		position: absolute;
		right: -1rem;
		top: 50%;
		transform: translateY(-50%);
	}
`;

const TextLink = forwardRef(({ as, className, color, children, reverse, icon: Icon, onClick, size, ...rest }, ref) => (
    <Root as={as} className={className} interaction="opacity" onClick={onClick} ref={ref} reverse={reverse} {...rest}>
        <Text color={color} fontSize={size} lineHeight={size}>{children}</Text>
        <Icon color={color} size={size} />
    </Root>
));

TextLink.defaultProps = {
	icon: ChevronRightIcon,
}

export default TextLink;

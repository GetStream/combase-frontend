import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { childColorVariants, parentColorVariants, layout } from '@combase.app/styles';

import Box from '../Box';
import IconLabel from '../IconLabel';

const Root = styled(Box).attrs({
    borderRadius: 1,
    fontWeight: 600,
    gapLeft: 1,
    minWidth: 2,
    paddingX: 2,
    paddingY: 1,
})`
	${parentColorVariants};
    ${layout.minWidth};
    ${layout.minHeight};

    display: inline-flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const StyledIconLabel = styled(IconLabel)`
	& p, & svg {
		${childColorVariants};
	}
`;

const Label = forwardRef(({ children, color, gap, reverseLabel, size, variant, ...props }, ref) => (
    <Root {...props} color={color} ref={ref} variant={variant}>
        <StyledIconLabel color={color} variant={variant} gap={gap} reverse={reverseLabel}>
            {children}
        </StyledIconLabel>
    </Root>
));

Label.propTypes = {
    color: PropTypes.string,
    reverseLabel: PropTypes.bool,
	variant: PropTypes.oneOf(['ghost', 'filled', 'border'])
};

Label.defaultProps = {
    color: 'red',
    fontFamily: 'text',
	gap: 1,
	variant: 'filled'
};

export default Label;
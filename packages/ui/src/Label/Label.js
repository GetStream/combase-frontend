import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color as colorSystem, colorAlpha, layout } from '@combase.app/styles';

import Box from '../Box';
import IconLabel from '../IconLabel';

const Root = styled(Box).attrs(props => ({
    borderRadius: 1,
    fontWeight: 600,
    gapLeft: 1,
    minWidth: 2,
    paddingX: 2,
    paddingY: 1,
}))`
    ${colorSystem.backgroundColor};
	${colorAlpha};
    ${layout.minWidth};
    ${layout.minHeight};

    display: inline-flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Label = forwardRef(({ colorAlpha, children, color, reverseLabel, size, textColor, ...props }, ref) => (
    <Root {...props} backgroundColor={color} backgroundColorAlpha={colorAlpha} ref={ref}>
        <IconLabel color={textColor} gap={1} reverse={reverseLabel}>
            {children}
        </IconLabel>
    </Root>
));

Label.propTypes = {
    color: PropTypes.string,
    reverseLabel: PropTypes.bool,
    textColor: PropTypes.string,
};

Label.defaultProps = {
    color: 'red',
    fontFamily: 'text',
	textColor: 'white'
};

export default Label;
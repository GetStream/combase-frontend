import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color as colorSystem, layout } from '@combase.app/styles';

import { Box } from '../Layout';
import { IconLabel } from '../IconLabel';

const Root = styled(Box).attrs(props => ({
    borderRadius: 1,
    fontWeight: 600,
    gapLeft: 1,
    minWidth: 2,
    paddingX: 2,
    paddingY: 1,
}))`
    ${colorSystem.backgroundColor};
    ${layout.minWidth};
    ${layout.minHeight};

    display: inline-flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Label = forwardRef(({ children, color, reverseLabel, size, ...props }, ref) => (
    <Root {...props} backgroundColor={color} ref={ref}>
        <IconLabel color="white" gap={1} reverse={reverseLabel}>
            {children}
        </IconLabel>
    </Root>
));

Label.propTypes = {
    color: PropTypes.string,
    reverseLabel: PropTypes.bool,
};

Label.defaultProps = {
    color: 'red',
    fontFamily: 'text',
};

export default Label;
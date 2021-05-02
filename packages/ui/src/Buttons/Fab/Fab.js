import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, layout, position, system, zIndex } from '@combase.app/styles';

import { ButtonBase } from '../shared';

const Root = styled(ButtonBase).attrs({
    borderRadius: 'circle',
    type: 'button',
})`
    ${layout};
    ${zIndex};
    ${position};
    ${interactions};
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Icon = styled.svg`
    ${system({
        size: {
            properties: ['width', 'height'],
            scale: 'sizes',
            transform: (value, scale) => scale[Math.max(1, value - 4)],
        },
    })}
`;

const Fab = forwardRef(({ icon, size, ...props }, ref) => (
    <Root {...props} interaction="bump" size={size} ref={ref}>
        <Icon as={icon} color="white" size={size} />
    </Root>
));

Fab.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
};

Fab.defaultProps = {
    backgroundColor: 'primary',
    size: 9,
};

export default Fab;
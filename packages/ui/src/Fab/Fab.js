import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, layout, position, system, zIndex } from '@combase.app/styles';

import ButtonBase from '../ButtonBase';

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

const Fab = forwardRef(({ icon: Icon, iconSize, size, ...props }, ref) => (
    <Root {...props} interaction="bump" size={size} ref={ref}>
        <Icon color="white" size={iconSize} />
    </Root>
));

Fab.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
};

Fab.defaultProps = {
    backgroundColor: 'primary',
	iconSize: 7,
    size: 9,
};

export default Fab;
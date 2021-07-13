import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { system } from '@combase.app/styles';

import Box from '../Box';

const iconSize = system({
    size: {
        properties: ['width', 'height'],
        scale: 'fontSizes',
        transform: (value, scale) => {
            return scale[value + 1];
        },
    },
});

const Badge = styled(Box)`
    ${iconSize};
    border-radius: 50%;
    flex-shrink: 0;
    background-color: ${({ color, theme }) => theme.colors[color]};
`;

Badge.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

Badge.defaultProps = {
    color: 'primary',
	'data-testid': 'badge',
    size: 0,
};

export default Badge;

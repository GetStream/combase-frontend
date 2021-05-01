import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fill, opacity, system } from '@combase.app/styles';

import { Placeholder } from '../Placeholder';

const iconSize = system({
    size: {
        properties: ['width', 'height'],
        scale: 'fontSizes',
        transform: (value, scale) => {
            return scale[value + 1];
        },
    },
});

const Root = styled.svg`
    ${iconSize};
    ${opacity};

    & path {
        ${fill};
    }

    &${Placeholder} {
        border-radius: 50%;
    }
`;

const Icon = forwardRef(({ as, children, color, ...props }, ref) => (
    <Root {...props} as={!children ? Placeholder : as} fill={color} ref={ref}>
        {children}
    </Root>
));

Icon.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,
    viewBox: PropTypes.string,
};

Icon.defaultProps = {
    color: 'text',
    size: [1, 2],
    viewBox: '0 0 16 16',
};

export default Icon;
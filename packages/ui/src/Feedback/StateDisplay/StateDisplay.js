/* eslint-disable no-nested-ternary */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '../../Box';
import Text from '../../Text';
import { InfoIcon, WarningIcon } from '../../icons';

import Spinner from '../Spinner';

const Root = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
        text-align: center;
        margin-top: 0.25rem;
        font-variation-settings: 'wght' 500;
        color: ${({ theme }) => theme.colors.altText};
        user-select: none;
    }
`;

const StateDisplay = forwardRef(({ children, color, error, icon: Icon, loading, size, text, textSize, ...rest }, ref) => (
    <Root {...rest} ref={ref}>
        {error ? (
            <WarningIcon color="warning" size={size} />
        ) : loading ? (
            <Spinner key={0} size={5} color="altText" />
        ) : (
            <Icon color={color} size={size} />
        )}
        {text ? (
            <Text color={color} textSize={textSize}>
                {text}
            </Text>
        ) : null}
        {children}
    </Root>
));

StateDisplay.propTypes = {
    color: PropTypes.string,
    error: PropTypes.bool,
    icon: PropTypes.func,
    loading: PropTypes.bool,
    size: PropTypes.number,
    text: PropTypes.string,
    textSize: PropTypes.number,
};

StateDisplay.defaultProps = {
    color: 'altText',
    icon: InfoIcon,
    size: 4,
    text: 'Nothing to show.',
    paddingX: 6,
    paddingY: 6,
};
/* eslint-enable no-nested-ternary */

export default StateDisplay;

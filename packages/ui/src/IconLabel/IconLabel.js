import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, itemGap } from '@combase.app/styles';

import Box from '../Box';

const IconLabel = styled(Box).attrs(props => ({
    gapRight: props.reverse ? props.gap : 0,
    gapLeft: props.reverse ? 0 : props.gap,
}))`
    display: flex;
    flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
    align-items: center;

	& svg {
		flex-shrink: 0;
	}

    & > * + * {
        ${itemGap};
    }
`;

IconLabel.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    label: PropTypes.string,
    reverse: PropTypes.bool,
    size: PropTypes.number,
};

IconLabel.defaultProps = {
    gap: 1,
};

export default IconLabel
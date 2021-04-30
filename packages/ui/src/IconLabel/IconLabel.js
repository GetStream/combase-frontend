import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fill, system, itemGap } from '@combase.app/styles';

import { Box } from '../Layout';
import { Text } from '../Text';

const iconFill = system({
	iconColor: {
		property: 'fill',
		scale: 'colors'
	}
})

const IconLabel = styled(Box).attrs(props => ({
    gapRight: props.reverse ? props.gap : 0,
    gapLeft: props.reverse ? 0 : props.gap,
}))`
    display: flex;
    flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
    align-items: center;

    & > * + * {
        ${itemGap};
    }

    & ${Text} {
        ${color.color};
    }

    svg {
        path {
			${fill};
            ${iconFill};
        }
    }
`;

IconLabel.propTypes = {
    color: PropTypes.string,
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
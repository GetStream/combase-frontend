import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fill, itemGap } from '@combase.app/styles';

import Box from '../Box';
// import Text from '../Text';

const IconLabel = styled(Box).attrs(props => ({
    gapRight: props.reverse ? props.gap : 0,
    gapLeft: props.reverse ? 0 : props.gap,
}))`
    display: inline-flex;
    flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
    align-items: center;

	${'' /* & ${Text} {
		${color};
	} */}

	& svg {
		flex-shrink: 0;
		& path {
			${fill};
		}
	}

    & > * + * {
        ${itemGap};
    }
`;

IconLabel.propTypes = {
    color: PropTypes.string,
    gap: PropTypes.number,
    reverse: PropTypes.bool,
};

IconLabel.defaultProps = {
    gap: 1,
};

export default IconLabel
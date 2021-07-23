import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, itemGap, layout, parentColorVariants, childColorVariants } from '@combase.app/styles';

import Box from '../Box';
import Text from '../Text';

const Root = styled(Box)`
    ${layout.maxHeight};
    display: inline-flex;
    flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
    align-items: center;
    border-radius: 2rem;
    user-select: none;
    ${layout};
	${parentColorVariants};

    & svg {
		${childColorVariants};
    }

    & > ${Text} {
        ${itemGap};
        ${childColorVariants};
    }
`;

const CloseButton = styled.div`
    border: 0;
    outline: 0;
    margin: 0;
    background: none;
    cursor: pointer;
    ${interactions}
`;

const Chip = ({ action, color, children, icon: Icon, iconColor, iconProps, label, selected, onActionClick, value, ...props }) => {
	const handleActionClick = useCallback(() => {
		if (onActionClick) {
			onActionClick(value);
		}
	}, [onActionClick, value]);

	return (
		<Root {...props} color={color} borderRadius="circle" gapLeft={1} gapRight={1} padding={1} selected={selected}>
			{Icon ? <Icon color={color} {...iconProps} size={3} /> : null}
			<Text color={color} fontSize={3} fontWeight="600" lineHeight={4}>
				{label}
			</Text>
			{action ? (
				<CloseButton as={action} color={iconColor || color} interaction={selected ? undefined : 'opacity'} onClick={handleActionClick} size={3} />
			) : null}
		</Root>
	);
}

Chip.propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.any,
    iconColor: PropTypes.string,
    iconProps: PropTypes.object,
    label: PropTypes.string.isRequired,
    onActionClick: PropTypes.func,
    selected: PropTypes.bool,
    variant: PropTypes.oneOf(['ghost', 'filled', 'border']),
};

Chip.defaultProps = {
    color: 'primary',
    label: '',
    size: 'xs',
    variant: 'filled',
};

export default Chip;
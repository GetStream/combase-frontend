import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, itemGap, layout, parentColorVariants, childColorVariants, variant } from '@combase.app/styles';

import Box from '../Box';
import Placeholder from '../Placeholder';
import Text from '../Text';

const Root = styled(Box)`
    ${layout.maxHeight};
    display: inline-flex;
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

    &${Placeholder} {
        width: 4rem;
        height: ${({ size }) => size}rem;
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

const Chip = ({ action, color, children, icon: Icon, iconColor, iconProps, label, selected, onActionClick, size, value, ...props }) => (
    <Root {...props} color={color} borderRadius="circle" gapLeft={1} gapRight={1} padding="small" selected={selected} size={size}>
        {Icon ? <Icon {...iconProps} color={color} size={size === 'sm' ? 3 : 2} /> : null}
        <Text fontSize={2} fontWeight="500" lineHeight={size === 'sm' ? 3 : 2}>
            {label}
        </Text>
        {action ? (
            <CloseButton as={action} color={iconColor || color} interaction={selected ? undefined : 'opacity'} onClick={() => onActionClick(value || label)} size={size === 'sm' ? 3 : 2} />
        ) : null}
    </Root>
);

Chip.propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.any,
    iconColor: PropTypes.string,
    iconProps: PropTypes.object,
    label: PropTypes.string.isRequired,
    onActionClick: PropTypes.func,
    selected: PropTypes.bool,
    size: PropTypes.oneOf(['xs', 'sm']).isRequired,
    variant: PropTypes.oneOf(['ghost', 'filled', 'border']),
};

Chip.defaultProps = {
    color: 'primary',
    label: '',
    size: 'xs',
    variant: 'filled',
};

export default Chip;
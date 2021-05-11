import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, itemGap, layout, variant } from '@combase.app/styles';

import Box from '../Box';
import Placeholder from '../Placeholder';
import { Text } from '../Text';

// TODO: Dedupe with IconBubble
const rootVariant = ({ color, invert }) =>
    variant({
        variants: {
            ghost: {
                backgroundColor: ({ colors, utils }) => utils.colors.fade(color.startsWith('#') ? color : colors[color], 0.08),
            },
            filled: {
                backgroundColor: invert ? 'surface' : color,
            },
            border: {
                borderWidth: 'thin',
                borderStyle: 'solid',
                borderColor: color,
            },
        },
    });

const Root = styled(Box)`
    ${layout.maxHeight};
    display: inline-flex;
    align-items: center;
    border-radius: 2rem;
    user-select: none;

    & svg > path {
        ${({ color, invert }) =>
            variant({
                variants: {
                    ghost: {
                        color,
                    },
                    border: {
                        color,
                    },
                    filled: {
                        '& path': {
                            fill: invert ? color : 'surface',
                        },
                    },
                },
            })}
    }

    & > ${Text} {
        ${itemGap};
        ${({ color, invert }) =>
            variant({
                variants: {
                    ghost: {
                        color,
                    },
                    border: {
                        color,
                    },
                    filled: {
                        color: invert ? color : 'surface',
                    },
                },
            })}
    }

    &${Placeholder} {
        width: 4rem;
        height: ${({ size }) => size}rem;
    }

    ${variant({
        prop: 'size',
        variants: {
            xs: {
                maxHeight: 4,
                padding: 1,
            },
            sm: {
                maxHeight: 5,
                padding: 2,
            },
        },
    })}

    ${rootVariant}
`;

const CloseButton = styled.div`
    border: 0;
    outline: 0;
    margin: 0;
    background: none;
    cursor: pointer;
    ${interactions}
`;

const Chip = ({ action, color, children, icon: Icon, iconColor, iconProps, label, selected, onActionClick, value, ...props }) => (
    <Root {...props} color={color} borderRadius="circle" gapLeft={1} gapRight={1} selected={selected}>
        {Icon ? <Icon {...iconProps} color={iconColor || color} size={2} /> : null}
        <Text fontSize={2} fontWeight="500" lineHeight={2}>
            {label}
        </Text>
        {action ? (
            <CloseButton as={action} color={iconColor || color} interaction={selected ? undefined : 'opacity'} onClick={() => onActionClick(value || label)} size={2} />
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
    variant: 'ghost',
};

export default Chip;
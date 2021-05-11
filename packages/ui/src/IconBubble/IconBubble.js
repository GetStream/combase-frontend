import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, layout, system, variant } from '@combase.app/styles';

import Box from '../Box';
import { Placeholder } from '../Placeholder';
import { Text } from '../Text';

const rootVariant = ({ color, invert }) => variant({
	variants: {
		ghost: {
			backgroundColor: ({ colors, utils }) => utils.colors.fade(color.startsWith('#') ? color : colors[color], 0.08),
		},
		filled: {
			backgroundColor: invert ? 'surface' : color
		},
		border: {
			borderWidth: 'thin',
			borderStyle: 'solid',
			borderColor: color,
		},
	}
})

const Root = styled(Box)`
	${color};
	${layout};
    display: inline-flex;
    flex-shrink: 0;
    background-size: cover;
    justify-content: center;
    align-items: center;
	${rootVariant};
`;

const Icon = styled.svg`
	${
		system({
			size: {
				properties: ['width', 'height'],
				scale: 'sizes',
				transform: (value, scale) => scale[Math.max(0, value - 4)],
			}
		})
	};
	${({ color, invert }) => variant({
		variants: {
			ghost: {
				color,
			},
			border: {
				color,
			},
			filled: {
				'& path': {
					fill: invert ? color : 'surface'
				}
			},
		}
	})}
`;

const Initials = styled(Text)`
    text-transform: capitalize;
    user-select: none;
    align-self: center;
    letter-spacing: 0;
	pointer-events: none;
	${system({
		size: {
			properties: ['font-size', 'line-height'],
			scale: 'fontSizes',
			transform: (value, scale) => scale[Math.max(value - 2, 0)]
		},
	})}
	${
		({ color, invert }) => variant({
			variants: {
				ghost: {
					color,
				},
				border: {
					color,
				},
				filled: {
					color: invert ? color : 'surface'
				},
			}
		})
	}
`;

const Emoji = styled(Box)`
	&:before {
		content: ${({ emoji }) => `"\\${emoji}"`};
		${
		system({
			size: {
				properties: ['font-size', 'line-height'],
				scale: 'sizes',
				transform: (value, scale) => scale[Math.max(0, value - 4)],
			}
		})
	};
	} 
`

const IconBubble = memo(({ emoji, icon, name, ...props }) => (
	<Root as={!icon && !name && !emoji ? Placeholder : 'div'} {...props}>
		{emoji || icon  ? <Icon as={emoji ? Emoji : icon} emoji={emoji} color={props.color} invert={props.invert} variant={props.variant} size={props.size} /> : null}
		{!icon && !emoji && name ? (
			<Initials color={props.color} size={props.size} fontWeight="700"  variant={props.variant}>
				{name.charAt(0)}
			</Initials>
		) : null}
	</Root>
));

IconBubble.propTypes = {
	borderRadius: PropTypes.oneOf(['squircle', 'circle']),
	color: PropTypes.string,
	icon: PropTypes.func,
	invert: PropTypes.bool,
	name: PropTypes.string,
    size: PropTypes.number,
	variant: PropTypes.oneOf(['ghost', 'filled', 'border']),
};

IconBubble.defaultProps = {
	borderRadius: 'squircle',
	color: 'primary',
	placeholderColor: 'text',
	invert: false,
	size: 8,
	variant: 'ghost',
};

export default IconBubble;
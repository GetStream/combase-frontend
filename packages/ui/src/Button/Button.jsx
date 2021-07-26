
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorAlpha, interactions, layout, shadow, variant } from '@combase.app/styles';

import Box from '../Box';
import Spinner from '../Spinner';
import IconLabel from '../IconLabel';
import ButtonBase from '../ButtonBase';
import Text from '../Text';

import { buttonSizeVariants, buttonVisualVariants } from './variants';

const Root = styled(ButtonBase)`
    ${shadow.boxShadow};
    ${layout};
    ${interactions};
	${colorAlpha};

    border: 0;
    margin: 0;
    outline: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    text-align: center;
    text-decoration: none;
    user-select: none;
    transition: ${({ theme }) => `200ms background, box-shadow ${theme.ease}`};
    width: ${({ fullWidth }) => (fullWidth ? '100%' : undefined)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	${IconLabel}, ${Text} {
		pointer-events: none;
		width: 100%;
		visibility: ${({ $loading }) => $loading ? 'hidden' : 'visible'};
	}

    ${buttonSizeVariants};
    ${buttonVisualVariants};
`;

const LoadingWrapper = styled(Box)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Button = forwardRef(({ children, loading, reverseLabel, ...props }, ref) => (
	<Root {...props} $loading={loading} interaction={props.variant === 'raised' ? variant : 'highlight'} ref={ref}>
		{children}
		{loading ? (
			<LoadingWrapper>
				<Spinner color={variant === 'raised' ? "white" : props.color} size={4} />
			</LoadingWrapper>
		) : null}
	</Root>
));

Button.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    reverseLabel: PropTypes.bool,
    size: PropTypes.oneOf(['xs', 'sm']),
    type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
    color: 'primary',
    disabled: false,
    type: 'button',
    variant: 'raised',
	size: 'sm',
    fullWidth: false,
};

export default Button;
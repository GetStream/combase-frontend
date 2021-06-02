import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorAlpha, interactions, layout, shadow, variant } from '@combase.app/styles';

import Spinner from '../Spinner';
import IconLabel from '../IconLabel';
import ButtonBase from '../ButtonBase';

import { buttonSizeVariants, buttonVisualVariants } from './variants';

const Root = styled(ButtonBase).attrs(() => ({
    borderRadius: 3,
    minHeight: 9,
    paddingX: 4,
    paddingY: 0,
}))`
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

	${IconLabel} {
		pointer-events: none;
		width: 100%;
	}

    ${buttonSizeVariants};
    ${buttonVisualVariants};
`;

const Button = forwardRef(({ children, loading, reverseLabel, ...props }, ref) => (
	<Root {...props} interaction={props.variant === 'raised' ? variant : 'highlight'} ref={ref}>
		{!loading ? children : (
			<Spinner color="white" size={4} />
		)}
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
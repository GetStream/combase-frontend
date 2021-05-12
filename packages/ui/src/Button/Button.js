import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colorAlpha, interactions, layout, shadow, variant } from '@combase.app/styles';

import { Spinner } from '../Feedback';
import IconLabel from '../IconLabel';
import ButtonBase from '../ButtonBase';

import { buttonSizeVariants, buttonVisualVariants } from './variants';

const Root = styled(ButtonBase).attrs(() => ({
    borderRadius: 3,
    minHeight: 8,
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
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    user-select: none;
    transition: ${({ theme }) => `200ms background, box-shadow ${theme.ease}`};
    width: ${({ fullWidth }) => (fullWidth ? '100%' : undefined)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	${IconLabel} {
		pointer-events: none;
	}

    ${buttonSizeVariants};
    ${buttonVisualVariants};
`;

const Button = forwardRef(({ children, loading, reverseLabel, ...props }, ref) => (
	<Root {...props} interaction={props.variant === 'raised' ? variant : 'highlight'} ref={ref}>
		{!loading ? (
			<IconLabel gap={1} color={props.disabled ? 'disabled' : undefined} reverse={reverseLabel} size={3}>
				{children}
			</IconLabel>
		) : (
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
    fullWidth: false,
};

export default Button;
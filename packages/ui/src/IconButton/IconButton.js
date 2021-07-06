import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, layout } from '@combase.app/styles';

import ButtonBase from '../ButtonBase';

const Root = styled(ButtonBase)`
    ${layout};
    border: 0;
    padding: 0;
    outline: 0;
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    display: inline-flex;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    ${interactions};

    & div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    & > div:before {
        content: '';
        ${({ color, disabled, interaction, theme, variant }) =>
		!disabled && interaction === 'bubble' || variant === 'filled'
                ? `
		width: 150%;
		height: 150%;
		position: absolute;
		background-color: ${variant === 'filled' ? theme.colors.surface : theme.utils.colors.fade(theme.colors[color], color === 'border' ? .16 : .08)};
		border-radius: 50%;
		z-index: 0;
		transform: scale(${variant === 'filled' ? 1 : 0});
		transition: 200ms transform ${theme.easing.snapPing}, 160ms background ${theme.easing.move};
		`
                : null};
    }

    &:hover > div:before {
        transform: scale(1);
    }

    &:active > div:before {
        transform: scale(0.9);
    }

    & svg {
        position: relative;
        z-index: 1;
    }
`;

const IconButton = forwardRef(({ as, className, children, color, fillAlpha, disabled, icon: Icon, onClick, size, style, ...rest }, ref) => (
        <Root
            as={as}
            className={className}
            color={color}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            ref={ref}
            size={size}
            style={style}
            {...rest}
        >
            {Icon ? (
				<div>
					<Icon fillAlpha={fillAlpha} color={disabled ? 'disabled' : color} size={size} />
				</div>
			) : null}
			{children}
        </Root>
    )
);

IconButton.propTypes = {
    as: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    icon: PropTypes.any.isRequired,
    onClick: PropTypes.func,
};

IconButton.defaultProps = {
    color: 'text',
    interaction: 'bubble',
    size: 4,
};

export default IconButton;
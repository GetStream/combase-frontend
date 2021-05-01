import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { interactions, layout } from '@combase.app/styles';

import { Box } from '../../Layout';

const Root = styled(Box).attrs(({ as }) => ({
    as,
    backgroundColor: 'transparent',
}))`
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
        ${({ color, interaction, theme }) =>
            interaction === 'bubble'
                ? `
		width: 125%;
		height: 125%;
		position: absolute;
		background-color: ${theme.colors[`${color}A`][color === 'border' ? 16 : 8]};
		border-radius: 50%;
		z-index: 0;
		transform: scale(0);
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

const IconButton = forwardRef(({ as, className, color, disabled, icon: Icon, onClick, size, style, ...rest }, ref) => {
    const handleClick = useCallback(e => {
        e.stopPropagation();
        onClick?.(e);
    }, []);
    return (
        <Root
            as={as}
            className={className}
            color={color}
            disabled={disabled}
            onClick={!disabled ? handleClick : undefined}
            ref={ref}
            size={size}
            style={style}
            {...rest}
        >
            <div>
                <Icon color={disabled ? 'disabled' : color} size={size} />
            </div>
        </Root>
    );
});

IconButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    icon: PropTypes.any.isRequired,
    onClick: PropTypes.func,
};

IconButton.defaultProps = {
    as: 'button',
    color: 'text',
    interaction: 'bubble',
    size: 4,
};

export default IconButton;
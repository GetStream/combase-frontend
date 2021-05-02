import React, { Children, cloneElement, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../../Layout';
import { IconButton } from '../../Buttons';

import { useSharedRef } from './useSharedRef';

const Root = styled(Box)`
    cursor: pointer;
`;

const Input = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 0;
`;

export const ToggleBase = forwardRef((props, ref) => {
    const {
        checked,
        checkedIcon,
        children,
        className,
        color,
        disabled,
        icon,
        id,
        inputRef: externalInputRef,
        indeterminate,
        indeterminateIcon,
        name,
		onClick,
        onBlur,
        onChange,
        onFocus,
        readOnly,
        required,
        size,
        tabIndex,
        type,
        value,
        ...other
    } = props;
    const internalInputRef = useRef();
    const inputRef = useSharedRef(undefined, [internalInputRef, externalInputRef]);

	const handleClick = (e) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		internalInputRef.current?.click();
		if (onClick) {
			onClick(e);
		}
	}

    const handleInputChange = event => {
        event.stopPropagation();
    	event.nativeEvent.stopImmediatePropagation();

        if (event.nativeEvent.defaultPrevented) {
            return;
        }

        onChange(event);
    };

    return (
        <Root
            as="span"
            className={className}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            role={undefined}
            tabIndex={null}
            {...other}
        >
            <Input
                checked={checked}
                disabled={disabled}
                id={id}
                name={name}
                onChange={handleInputChange}
                readOnly={readOnly}
                ref={inputRef}
                required={required}
                tabIndex={tabIndex}
                type="checkbox"
            />
            {children ? (
                cloneElement(Children.only(children), {
                    checked,
                    onClick: handleClick,
                    size,
                    value,
                })
            ) : (
                <IconButton
                    color={indeterminate || checked ? color : 'border'}
                    disabled={disabled}
                    // eslint-disable-next-line no-nested-ternary
                    icon={indeterminate ? indeterminateIcon || icon : checked ? checkedIcon : icon}
                    onClick={handleClick}
                    size={size}
                />
            )}
        </Root>
    );
});

ToggleBase.propTypes = {
    checked: PropTypes.bool,
    checkedIcon: PropTypes.func,
    className: PropTypes.string,
    color: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
    id: PropTypes.string,
    indeterminate: PropTypes.bool,
    indeterminateIcon: PropTypes.func,
    inputProps: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    size: PropTypes.number,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['button']),
};

ToggleBase.defaultProps = {
    color: 'primary',
	type: 'button',
};

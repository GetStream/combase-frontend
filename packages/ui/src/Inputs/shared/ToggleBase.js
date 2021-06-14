import React, { Children, cloneElement, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '../../IconButton';

import { useSharedRef } from './useSharedRef';
import { useControlledValue } from './useControlledValue';

const Input = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
	cursor: inherit;
`;

export const ToggleBase = forwardRef((props, ref) => {
    const {
		checkedColor,
        checkedIcon,
		children,
        className,
        color,
		checked: checkedProp,
        disabled,
        icon,
        id,
        inputRef: externalInputRef,
        name,
        onBlur,
        onChange,
		onClick,
        onFocus,
        readOnly,
        required,
        size,
        tabIndex,
        type,
        value,
    } = props;

	const [checked, setInternalValue] = useControlledValue({
		controlledValue: checkedProp,
        valueSelector: 'checked',
	});

    const internalInputRef = useRef();
    const inputRef = useSharedRef(undefined, [internalInputRef, externalInputRef]);

    const handleInputChange = event => {
        if (event.nativeEvent.defaultPrevented) {
            return;
        }

		setInternalValue(event);

		if (onChange) {
			onChange(event);
		}
    };

    return children ? cloneElement(Children.only(children), {
		onClick: (event) => {
			event.target.checked = !checked;
			handleInputChange(event)
		},
		checked,
	}) : (
        <IconButton
            className={className}
			color={checked ? checkedColor : color}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
			icon={checked ? checkedIcon || icon : icon}
            ref={ref}
            role={undefined}
            tabIndex={null}
			value={value}
			type={type}
			size={size}
        >
            <Input
                checked={checked}
                disabled={disabled}
                id={id}
                name={name}
                onChange={handleInputChange}
                readOnly={readOnly}
                ref={inputRef}
				onClick={onClick}
                required={required}
                tabIndex={tabIndex}
                type="checkbox"
				value={value}
            />
        </IconButton>
    );
});

ToggleBase.propTypes = {
 	checkedColor: PropTypes.func,
    className: PropTypes.string,
	checkedIcon: PropTypes.func,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    size: PropTypes.number,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['button', 'submit']),
	value: PropTypes.bool,
};

ToggleBase.defaultProps = {
	checkedColor: 'primary',
    color: 'border',
    type: 'button',
};
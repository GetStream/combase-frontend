import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonBase from '../ButtonBase';

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
	cursor: pointer;
`;

const ToggleBase = forwardRef((props, ref) => {
    const {
		checkedIcon,
		children,
        className,
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
        tabIndex,
        type,
        value,
    } = props;

	const [checked, setInternalValue] = useControlledValue({
		controlledValue: checkedProp,
		initialValue: false,
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

    return (
        <ButtonBase
            className={className}
            disabled={disabled}
            tabIndex={null}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            role="toggle"
        >
            <Input
                checked={checked}
                disabled={disabled}
                id={id}
                name={name}
				onClick={onClick}
                onChange={handleInputChange}
                readOnly={readOnly}
                ref={inputRef}
                required={required}
				tabIndex={tabIndex}
				type={type}
				value={value}
            />
			{checked ? checkedIcon : icon}
        </ButtonBase>
    );
});

ToggleBase.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['button', 'submit']),
	value: PropTypes.bool,
};

ToggleBase.defaultProps = {
    type: 'checkbox',
};

export default ToggleBase;
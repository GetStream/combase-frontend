import React from 'react';
import PropTypes from 'prop-types';

import { CheckboxIcon, CheckboxCheckedIcon, CheckboxIndeterminateIcon } from '../../icons';
import { useInput } from '../shared/useInput';
import { ToggleBase } from '../shared/ToggleBase';

export const Checkbox = ({
	activeColor,
	checkedIcon,
    className,
	color,
    disabled,
    icon,
    indeterminate,
    indeterminateIcon,
    name,
    onBlur,
    onChange,
    onFocus,
    size,
    value,
}) => {

    const [inputProps] = useInput({
        name,
        onBlur,
        onChange,
        onFocus,
        type: 'toggle',
        value,
    });

    return (
        <ToggleBase
            className={className}
            {...inputProps}
            checkedIcon={checkedIcon}
            disabled={disabled}
            icon={indeterminate ? indeterminateIcon : icon}
			color={indeterminate || inputProps.value ? activeColor : color}
			type="button"
            size={size}
        />
    );
};

Checkbox.propTypes = {
	activeColor: PropTypes.string,
    error: PropTypes.string,
    helper: PropTypes.string,
    indeterminate: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    size: PropTypes.number,
    value: PropTypes.any,
};

Checkbox.defaultProps = {
	activeColor: 'primary',
	color: 'border',
    checkedIcon: CheckboxCheckedIcon,
    icon: CheckboxIcon,
    indeterminateIcon: CheckboxIndeterminateIcon,
    size: 4,
};

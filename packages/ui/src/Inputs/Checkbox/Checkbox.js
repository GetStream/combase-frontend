import React from 'react';
import PropTypes from 'prop-types';

import { CheckboxIcon, CheckboxCheckedIcon, CheckboxIndeterminateIcon } from '../../icons';
import { useInput } from '../shared/useInput';
import { ToggleBase } from '../shared/ToggleBase';

export const Checkbox = ({
    checkedIcon,
    className,
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
            icon={icon}
			type="button"
            indeterminate={indeterminate}
            indeterminateIcon={indeterminateIcon}
            size={size}
        />
    );
};

Checkbox.propTypes = {
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
    checkedIcon: CheckboxCheckedIcon,
    icon: CheckboxIcon,
    indeterminateIcon: CheckboxIndeterminateIcon,
    size: 4,
};

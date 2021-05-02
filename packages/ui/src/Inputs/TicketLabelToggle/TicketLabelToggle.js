import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { PriorityIcon, PriorityHighIcon, StarIcon } from '../../icons';
import { useInput } from '../shared/useInput';
import { ToggleBase } from '../shared/ToggleBase';

export const TicketLabelToggle = forwardRef(({ className, disabled, name, onBlur, onChange, onFocus, size, type, value }, ref) => {
    const [{ onChange: onInputChange, ...inputProps }] = useInput({
        name,
        onBlur,
        onChange,
        onFocus,
        type: type === 'priority' ? 'value' : 'toggle',
        value,
    });

    const icon = type === 'star' ? StarIcon : PriorityIcon;
    const color = type === 'star' ? 'yellow' : 'red';

    const handleChange = useCallback(
        e => {
            if (type === 'priority') {
                const overrideEvent = {
                    target: {
                        name: e.target.name,
                        value: (value + 1) % 3,
                    },
                };
                return onInputChange(overrideEvent);
            }

            return onInputChange(e);
        },
        [value]
    );

    return (
        <ToggleBase
            {...inputProps}
            className={className}
            checked={type === 'priority' ? Boolean(value) : inputProps?.checked}
            onChange={handleChange}
            color={color}
            checkedIcon={type === 'priority' && value === 2 ? PriorityHighIcon : icon}
            disabled={disabled}
            icon={icon}
            indeterminateIcon={icon}
            ref={ref}
            size={size}
        />
    );
});

TicketLabelToggle.propTypes = {
    error: PropTypes.string,
    helper: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    size: PropTypes.number,
    type: PropTypes.oneOf(['value', 'toggle']),
    value: PropTypes.any,
};

TicketLabelToggle.defaultProps = {
    size: 4,
};

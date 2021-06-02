import { useCallback, useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { useControlledValue } from './useControlledValue';

export const useInput = ({ 
	name, 
	onChange: handleChange, 
	onBlur: handleBlur, 
	onFocus: handleFocus, 
	onKeyDown, 
	type, 
	value: valueProp 
}) => {
    const id = useMemo(() => `${name}_${nanoid(6)}`, [name]);

    const valueSelector = type === 'toggle' ? 'checked' : 'value';
    const [value, setInternalValue] = useControlledValue({
        controlledValue: valueProp,
        valueSelector,
    });

    const [focused, setFocus] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
		if (Array.isArray(value)) {
			setHasValue(Boolean(value.length));
		} else {
			const hasValidValue = value && value !== null && value !== undefined;

	        setHasValue(Boolean(hasValidValue));
		}
    }, [hasValue, value]);

    const onBlur = useCallback(
        e => {
            if (handleBlur) {
                handleBlur(e);
            }

            setFocus(false);
        },
        [handleBlur]
    );

    const onFocus = useCallback(
        e => {
            if (handleFocus) {
                handleFocus(e);
            }

            setFocus(false);
        },
        [handleFocus]
    );

    const onChange = useCallback(
        e => {
            setInternalValue(e);

            if (handleChange) {
				handleChange(e);
            }
        },
        [handleChange, type, value]
    );

    const inputProps = useMemo(
        () => ({
            id,
            name,
            onBlur,
            onChange,
            onFocus,
            onKeyDown,
            value
        }),
        [id, name, onBlur, onChange, onFocus, onKeyDown, value]
    );
		
    return [
        inputProps,
        {
            focused,
            hasValue,
        },
    ];
};

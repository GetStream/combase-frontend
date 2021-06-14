import { useCallback, useRef, useState } from 'react';

export const useControlledValue = ({ controlledValue, initialValue = '', valueSelector = 'value', type }) => {
	const { current: isControlled } = useRef(controlledValue !== undefined);
	
	// eslint-disable-next-line no-nested-ternary
	const [internalValue, setValue] = useState(isControlled ? controlledValue : valueSelector === 'checked' ? false : initialValue);
	const value = isControlled ? controlledValue : internalValue;

	const setInternalValue = useCallback((event) => {
		if (!isControlled) {
			if (type === 'toggle') {
				setValue(event.target[valueSelector]);
			} else {
				setValue(event.target[valueSelector]);
			}
		}
	  }, [isControlled, valueSelector]);
	  
	  return [value, setInternalValue, isControlled]
}
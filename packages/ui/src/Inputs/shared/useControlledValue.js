import { useCallback, useRef, useState } from 'react';

export const useControlledValue = ({ controlledValue, initialValue = '', valueSelector = 'value' }) => {
	const { current: isControlled } = useRef(controlledValue !== undefined);
	
	// eslint-disable-next-line no-nested-ternary
	const [internalValue, setValue] = useState(isControlled ? controlledValue : initialValue);
	const value = isControlled ? controlledValue : internalValue;

	const setInternalValue = useCallback((event) => {
		if (!isControlled) {
			setValue(event.target[valueSelector]);
		}
	  }, [isControlled, valueSelector]);
	  
	  return [value, setInternalValue, isControlled]
}
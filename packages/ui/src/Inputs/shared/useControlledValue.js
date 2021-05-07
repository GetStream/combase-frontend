import { useCallback, useRef, useState } from 'react';

export const useControlledValue = ({ controlled, valueSelector = 'value' }) => {
	const { current: isControlled } = useRef(controlled !== undefined);
	
	// eslint-disable-next-line no-nested-ternary
	const [valueState, setValue] = useState(isControlled ? controlled : valueSelector === 'checked' ? false : '');
	const value = isControlled ? controlled : valueState;

	const setUncontrolledValue = useCallback((event) => {
		if (!isControlled) {
			setValue(event.target[valueSelector]);
		}
	  }, [isControlled, valueSelector]);
	  
	  return [value, setUncontrolledValue]
}
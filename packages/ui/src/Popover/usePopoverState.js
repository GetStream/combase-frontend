import { useRef } from 'react';
import { useToggle } from 'react-use';

const usePopoverState = () => {
	const ref = useRef();
	const [open, toggle] = useToggle();

	return [ref, {
		open,
		toggle,
	}]
};

export default usePopoverState;
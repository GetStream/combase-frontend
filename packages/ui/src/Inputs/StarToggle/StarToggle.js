import React from 'react';

import { StarIcon } from '../../icons';
import { useInput } from '../shared/useInput';
import { ToggleBase } from '../shared/ToggleBase';

const StarToggle = ({
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

	return <ToggleBase checkedColor="yellow" icon={StarIcon} onBlur={inputProps.onBlur} onChange={inputProps.onChange} onFocus={inputProps.onFocus} size={size} checked={inputProps.value} />;
};

export default StarToggle;
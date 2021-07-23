import React, { cloneElement, forwardRef } from 'react';
import styled from 'styled-components';

import { CheckboxIcon, CheckboxCheckedIcon, CheckboxIndeterminateIcon } from '../icons';
import ToggleBase from '../shared/ToggleBase';

const Root = styled(ToggleBase)`

`;

const Checkbox = forwardRef(({
	checkedIcon,
	className,
	color,
	icon,
	indeterminate,
	indeterminateIcon,
	inputRef,
	name,
	onBlur,
	onChange,
	onFocus,
	size,
	...props
}, ref) => (
	<Root
		className={className}
		color={color}
		icon={cloneElement(indeterminate ? indeterminateIcon : icon, { color: indeterminate ? color : "border", size })}
		inputRef={inputRef}
		checkedIcon={cloneElement(indeterminate ? indeterminateIcon : checkedIcon, { color, size })}
		onBlur={onBlur}
		onChange={onChange}
		onFocus={onFocus}
		name={name}
		ref={ref}
		size={size}
		type="checkbox"
		{...props}
	/>
));

Checkbox.defaultProps = {
	color: 'primary',
	checkedIcon: <CheckboxCheckedIcon />,
	icon: <CheckboxIcon />,
	indeterminateIcon: <CheckboxIndeterminateIcon />,
	size: 5,
};

export default Checkbox;
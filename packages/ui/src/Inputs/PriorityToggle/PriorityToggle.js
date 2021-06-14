import React, { useCallback } from 'react';

import Dropdown from '../../Dropdown';
import IconButton from '../../IconButton';
import { PriorityIcon, PriorityHighIcon } from '../../icons';
import Popover, { usePopoverState } from '../../Popover';
import MenuItem from '../../MenuItem';
import { useInput } from '../shared/useInput';

const priorityMap = [
	{
		icon: PriorityIcon, 
		color: 'border', 
		label: 'Low Priority'
	},
	{
		icon: PriorityIcon, 
		color: 'orange', 
		label: 'Mid Priority'
	},
	{
		icon: PriorityHighIcon, 
		color: 'red', 
		label: 'High Priority'
	},
];

const PriorityToggle = ({
	name,
	onBlur,
	onChange,
	onFocus,
	size,
	value,
}) => {
    const [anchor, { open: menuOpen, toggle: toggleMenu }] = usePopoverState();

	const [inputProps] = useInput({
		initialValue: 0,
		name,
        onBlur,
        onChange,
        onFocus,
        value,
	});

	const handleSelect = useCallback(e => {
		toggleMenu(false);
		inputProps.onChange(e);
	}, []);

	const selected = priorityMap[inputProps.value];

	return (
		<>
			<IconButton onClick={() => toggleMenu()} ref={anchor} color={selected.color} icon={selected.icon} size={size} />
			<Popover 
				as={Dropdown}
				anchor={anchor.current}
				open={menuOpen}
				onClose={() => toggleMenu(false)}
				subheading="Set priority"
				placement="bottom-end"
			>
				{
					priorityMap.map(({icon, color, label}, i) => (
						<MenuItem active={inputProps.value === i} label={label} icon={icon} onClick={handleSelect} color={color} value={i} />
					))
				}
			</Popover>
		</>
	);
};

export default PriorityToggle;
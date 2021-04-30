import React from 'react';
import { useToggle } from 'react-use';

import { CloseIcon, StarIcon } from '../../icons';

import IconButton from "./IconButton";

export const Default = () => <IconButton icon={CloseIcon} />;
export const Toggle = () => {
	const [on, toggle] = useToggle();
	return <IconButton color={on ? 'yellow' : 'border'} icon={StarIcon} onClick={() => toggle(!on)} />
};

export default {
    component: IconButton,
    title: "Buttons/IconButton",
};
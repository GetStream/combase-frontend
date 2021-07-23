import React from 'react';

import Avatar from '../Avatar';
import { BadgeIcon, CloseCircleIcon } from '../icons';

import Chip from './Chip';

const iconProps = {
    borderRadius: 'circle',
    name: 'Luke S.',
    src: 'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512',
};

export default {
    component: Chip,
    title: 'shared/Chip',
};

const Template = (args) => (
	<Chip {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
	label: 'Chip',
};

export const Action = Template.bind({});
Action.args = {
	action: CloseCircleIcon,
	color: 'green',
	variant: 'ghost',
	icon: Avatar,
	iconProps,
	label: iconProps.name,
};

export const AvatarChip = Template.bind({});
AvatarChip.args = {
	backgroundColor: 'offWhite',
	color: 'green',
	variant: null,
	icon: Avatar,
	iconProps,
	label: iconProps.name,
};

export const CustomChip = Template.bind({});
CustomChip.args = {
	backgroundColor: 'offWhite',
	color: 'text',
	variant: null,
	icon: BadgeIcon,
	reverse: true,
	iconProps: {
		color: 'green',
	},
	label: 'Active',
};

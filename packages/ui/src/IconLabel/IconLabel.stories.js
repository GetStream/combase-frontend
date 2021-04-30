import React from 'react';

import { CalendarIcon } from '../icons';
import { Text } from '../Text';

import IconLabel from './IconLabel';

export const Default = () => (
	<IconLabel gap={1} icon={CalendarIcon} label="2h ago">
		<CalendarIcon />
		<Text variant="label">
			{"2h ago"}
		</Text>
	</IconLabel>
);

export default {
    component: IconLabel,
    title: "shared/IconLabel",
};
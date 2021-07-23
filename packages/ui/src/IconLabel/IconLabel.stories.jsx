import React from 'react';

import { CalendarIcon } from '../icons';
import Text from '../Text';

import IconLabel from './IconLabel';

export default {
    component: IconLabel,
    title: "shared/IconLabel",
};

const Template = (args) => (
	<IconLabel {...args}>
		<CalendarIcon size={3} />
		<Text variant="label">
			2h ago
		</Text>
	</IconLabel>
);

export const Standard = Template.bind({});
Standard.args = {
	color: 'text',
	gap: 1,
	reverse: false,
};

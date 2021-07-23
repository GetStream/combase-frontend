import React from 'react';

import Spinner from '.';

export default {
    component: Spinner,
    title: 'shared/Spinner',
	argTypes: {
		color: { 
			description: "Set the color of the Spinner based on the `colors` object of the design system.",
			control: 'text',
		},
		size: { 
			description: "Set the size of the Spinner along the `sizes` scale of the design system.",
			control: 'number',
		}
	  },
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {};

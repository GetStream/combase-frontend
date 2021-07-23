import React from 'react';
import Avatar from '.';

export default {
    component: Avatar,
    title: 'shared/Avatar',
	argTypes: {
		name: { 
			description: "Set the name of the user displayed in the avatar. (Used to create the 'Initial' fallback)",
			control: 'text' 
		},
		src: { 
			control: 'text',
			description: "Set the src of the users avatar image."
		},
	  },
};

const Template = (args) => <Avatar {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  name: 'Luke',
  src: 'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512'
};

export const Initial = Template.bind({});
Initial.args = {
	name: 'Luke',
};

export const Placeholder = Template.bind({});
Placeholder.args = {};

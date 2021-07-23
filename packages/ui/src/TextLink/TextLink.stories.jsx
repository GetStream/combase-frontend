import React from 'react';

import TextLink from './TextLink';

export default {
    component: TextLink,
    title: "shared/TextLink",
};

const Template = (args) => (
	<TextLink {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
	children: 'Click Me',
};

import React from 'react';

import StreamLogo from './StreamLogo';

export default {
    component: StreamLogo,
    title: "shared/StreamLogo",
};

const Template = (args) => <StreamLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
	size: 8
};

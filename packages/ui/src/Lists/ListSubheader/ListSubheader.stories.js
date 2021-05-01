import React from 'react';

import { ListSubheader } from '.';

export const Default = () => (
    <ListSubheader>
		{"Testing"}
	</ListSubheader>
);


export default {
	component: ListSubheader,
	defaultProps: {
		children: "Inbox"
	},
    title: 'Lists/ListSubheader',
};

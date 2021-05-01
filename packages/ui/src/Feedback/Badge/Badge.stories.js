import React from 'react';

import Badge from './Badge';

export const New = () => <Badge />;
export const Active = () => <Badge color="green" />;
export const Attention = () => <Badge color="yellow" />;
export const Error = () => <Badge color="red" />;

export default {
    component: Badge,
    title: 'Feedback/Badge',
};

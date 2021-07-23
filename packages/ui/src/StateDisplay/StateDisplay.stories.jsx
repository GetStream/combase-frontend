import React from 'react';

import StateDisplay from '.';

export const Default = () => <StateDisplay />;
export const Loading = () => <StateDisplay loading text="" />;
export const ErrorDisplay = () => <StateDisplay error text="Something went wrong!" />;

export default {
    component: StateDisplay,
    title: 'shared/StateDisplay',
};

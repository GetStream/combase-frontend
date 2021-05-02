import React, { useState } from 'react';

import { Tabs, Tab } from '.';

// TODO: Router-bound tabs example.
/**
 * - Set the value of each tab to the react-router route param (match.params.X) for each sub route,
 * - Set the onClick handler to call history.push()
 * - Instead of value being in useState, pass the match.params.X value directly to the "value" prop of <Tabs />
 */

export const Default = () => {
    const [value, setValue] = useState('all');

    return (
        <Tabs onChange={setValue} value={value}>
            <Tab label="All" value="all" />
            <Tab label="CRM" value="crm" />
            <Tab label="Enrichment" value="enrichment" />
            <Tab label="Custom" value="custom" />
        </Tabs>
    );
};

export default {
    component: Tabs,
    title: "shared/Tabs",
};
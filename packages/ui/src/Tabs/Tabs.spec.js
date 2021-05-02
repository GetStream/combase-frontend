import React from "react";

import { render } from '../../../../config/test-utils';

import { Tabs, Tab } from ".";

describe("Tabs", () => {
    test("renders correctly", () => {
        const onChange = jest.fn();

        render(
            <Tabs onChange={onChange} value="all">
                <Tab label="All" value="all" />
                <Tab label="CRM" value="crm" />
            </Tabs>
        );
    });
});

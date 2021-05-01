import React from "react";

import { render } from '@conf/test-utils';

import { ToggleGroup, ToggleGroupOption } from ".";

describe("ToggleGroup", () => {
  test("renders correctly", () => {
    const onChange = jest.fn();

    render(
      <ToggleGroup onChange={onChange} value="all">
        <ToggleGroupOption value="all"><p>{"All"}</p></ToggleGroupOption>
        <ToggleGroupOption value="open"><p>{"Open"}</p></ToggleGroupOption>
      </ToggleGroup>
    );
  });
});

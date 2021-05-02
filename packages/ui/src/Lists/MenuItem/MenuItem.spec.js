import React from "react";

import { render } from '@conf/test-utils';

import { MenuItem } from ".";

describe("MenuItem", () => {  
  test("renders correctly", () => {
    render(<MenuItem label="Label" />);
  });
});

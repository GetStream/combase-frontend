import React from "react";

import { render } from '@conf/test-utils';

import MenuItem from "./MenuItem";

describe("MenuItem", () => {  
  test("renders correctly", () => {
    render(<MenuItem label="Label" />);
  });
});

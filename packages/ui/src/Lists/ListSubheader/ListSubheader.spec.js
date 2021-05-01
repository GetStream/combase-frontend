import React from "react";

import { render } from '../../../../config/test-utils';

import { ListSubheader } from ".";

describe("ListSubheader", () => {  
  test("renders correctly", () => {
    render(<ListSubheader label="Label" />);
  });
});

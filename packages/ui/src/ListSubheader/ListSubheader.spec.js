import React from "react";

import { render } from '@conf/test-utils';

import ListSubheader from "./ListSubheader";

describe("ListSubheader", () => {  
  test("renders correctly", () => {
    render(<ListSubheader label="Label" />);
  });
});

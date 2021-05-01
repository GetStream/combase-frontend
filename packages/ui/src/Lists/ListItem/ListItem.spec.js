import React from "react";

import { render } from '../../../../config/test-utils';

import { ListItem } from ".";

describe("ListItem", () => {  
  test("renders correctly", () => {
    render(<ListItem />);
  });
});

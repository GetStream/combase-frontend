import React from "react";
import '@conf/matchMedia.mock';
import { render } from '@conf/test-utils';

import ListItem from "./ListItem";

describe("ListItem", () => {  
  test("renders correctly", () => {
    render(<ListItem />);
  });
});

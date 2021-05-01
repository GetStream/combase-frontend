import React from "react";

import { render } from '@conf/test-utils';

import Chip from "./Chip";

describe("Chip", () => {  
  test("renders correctly", () => {
    render(<Chip />);
  });
});

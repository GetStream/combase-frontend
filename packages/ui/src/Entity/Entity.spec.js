import React from "react";

import { render } from '@conf/test-utils';

import Entity from "./Entity";

describe("Entity", () => {  
  test("renders correctly", () => {
    render(<Entity />);
  });
});

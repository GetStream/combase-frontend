import React from "react";

import { render } from '@conf/test-utils';

import Avatar from "./Avatar";

describe("Avatar", () => {
  test("renders correctly", () => {
    render(<Avatar />);
  });
});

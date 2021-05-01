import React from "react";

import { render } from '@conf/test-utils';

import { TextInput } from ".";

describe("TextInput", () => {
  test("renders correctly", () => {
    render(<TextInput />);
  });
});

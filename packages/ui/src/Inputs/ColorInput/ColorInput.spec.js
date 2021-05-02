import React from "react";

import '@conf/matchMedia.mock';
import { render } from '@conf/test-utils';

import { ColorInput } from ".";

describe("ColorInput", () => {
  test("renders correctly", () => {
    render(<ColorInput />);
  });
});

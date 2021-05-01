import React from "react";

import { render } from '@conf/test-utils';

import { SearchToolbar } from ".";

describe("SearchToolbar", () => {
  test("renders correctly", () => {
    render(<SearchToolbar />);
  });
});

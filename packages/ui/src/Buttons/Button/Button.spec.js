import React from "react";

import { render } from '@conf/test-utils';

import Button from "./Button";

describe("Button", () => {
  const buttonLabel = "Test";
  
  test("renders child text as the label", () => {
    const { queryByText } = render(<Button>{buttonLabel}</Button>);

    expect(queryByText(buttonLabel)).toBeInTheDocument();
  });
});

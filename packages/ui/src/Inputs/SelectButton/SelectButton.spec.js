import React from "react";

import { render } from '@conf/test-utils';

import { SelectButton } from ".";

describe("SelectButton", () => {
  const buttonLabel = "Test";
  
  test("renders correctly", () => {
    const { queryByText } = render(<SelectButton>{buttonLabel}</SelectButton>);

    expect(queryByText(buttonLabel)).toBeInTheDocument();
  });
});

import React from "react";
import '@conf/matchMedia.mock';

import { render } from '@conf/test-utils';

import { SelectButton } from ".";

describe("SelectButton", () => {
  const buttonLabel = "Select a time";
  
  test("renders correctly", () => {
    const { queryByText } = render(<SelectButton label={buttonLabel} />);

    expect(queryByText(buttonLabel)).toBeInTheDocument();
  });
});

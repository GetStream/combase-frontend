import React from "react";

import { render } from '@conf/test-utils';

import PageTitle from "./PageTitle";

describe("PageTitle", () => {  
  test("renders correctly", () => {
    render(<PageTitle />);
  });
});

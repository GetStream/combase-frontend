import React from "react";

import { render } from '@conf/test-utils';
import { AddIcon } from "../../icons";

import IconButton from "./IconButton";

describe("IconButton", () => {  
  test("renders correctly", () => {
    render(<IconButton icon={AddIcon} />);
  });
});

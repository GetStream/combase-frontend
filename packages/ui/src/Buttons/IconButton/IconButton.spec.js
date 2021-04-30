import React from "react";

import { render } from '@conf/test-utils';
import { Icon } from "../Icon";

import IconButton from "./IconButton";

describe("IconButton", () => {  
  test("renders correctly", () => {
    render(<IconButton icon={Icon} />);
  });
});

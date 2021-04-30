import React from "react";

import { render } from '@conf/test-utils';
import { CalendarIcon } from "../icons";

import IconLabel from "./IconLabel";

describe("IconLabel", () => {  
  test("renders correctly", () => {
    render(<IconLabel icon={CalendarIcon} label="Yesterday" />);
  });
});

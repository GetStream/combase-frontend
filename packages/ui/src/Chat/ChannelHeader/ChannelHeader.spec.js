import React from "react";

import { render } from '../../../../../config/test-utils';

import { ChannelHeader } from ".";

describe("ChannelHeader", () => {  
  test("renders correctly", () => {
    render(<ChannelHeader />);
  });
});

import React from "react";

import { render } from '../../../../../config/test-utils';

import { ChannelPreview } from ".";

describe("ChannelPreview", () => {  
  test("renders correctly", () => {
    render(<ChannelPreview />);
  });
});

import React from "react";

import TextGroup from '../TextGroup';

import Placeholder from "./Placeholder";

export const Text = () => (
	<TextGroup>
		<Placeholder borderRadius={0} placeholderWidth={12} lineHeight={3} />
		<Placeholder borderRadius={0} placeholderWidth={10} lineHeight={3} />
	</TextGroup>
);

export default {
  component: Placeholder,
  title: "shared/Placeholder",
};

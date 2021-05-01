import React from "react";

import { ConversationsIcon } from "../icons";
import IconBubble from "./IconBubble";

export default {
  component: IconBubble,
  title: "shared/IconBubble",
};

export const Filled = () => <IconBubble icon={ConversationsIcon} />;
export const Border = () => <IconBubble icon={ConversationsIcon} variant="border" />;
export const Ghost = () => <IconBubble icon={ConversationsIcon} variant="ghost" />;
export const Empty = () => <IconBubble />;
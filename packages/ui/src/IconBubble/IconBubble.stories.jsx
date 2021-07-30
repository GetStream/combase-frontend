import React from "react";

import { ChatsIcon } from "../icons";
import IconBubble from "./IconBubble";

export default {
  component: IconBubble,
  title: "shared/IconBubble",
};

export const Filled = () => <IconBubble icon={ChatsIcon} variant="filled" />;
export const Border = () => <IconBubble icon={ChatsIcon} variant="border" />;
export const Ghost = () => <IconBubble icon={ChatsIcon} variant="ghost" />;
export const Empty = () => <IconBubble />;
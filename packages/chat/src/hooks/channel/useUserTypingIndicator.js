import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getUserTypingSelector = (typing, userId) => Boolean(typing?.[userId]);

export const useUserTypingIndicator = userId => useContextSelector(ChannelContext, ({ typing }) => getUserTypingSelector(typing, userId));

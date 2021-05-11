import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getChannelMembersSelector = (context) => context?.members;

export const useChannelMembers = () => useContextSelector(ChannelContext, getChannelMembersSelector);

import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getChannelMembersSelector = ({ members }) => members;

export const useChannelMembers = () => useContextSelector(ChannelContext, getChannelMembersSelector);

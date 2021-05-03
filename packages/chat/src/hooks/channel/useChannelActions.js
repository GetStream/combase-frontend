import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getChannelActionsSelector = ({ actions }) => actions;

export const useChannelActions = () => useContextSelector(ChannelContext, getChannelActionsSelector);

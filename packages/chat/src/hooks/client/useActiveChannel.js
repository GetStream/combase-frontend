import { useContextSelector } from 'use-context-selector';

import { ChatContext } from '../../contexts/client/context';

const getActiveChannelSelector = ({ activeChannel }) => activeChannel;

export const useActiveChannel = () => useContextSelector(ChatContext, getActiveChannelSelector);

import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getChannelSelector = ({ channel }) => channel;

export const useChannel = () => useContextSelector(ChannelContext, getChannelSelector);

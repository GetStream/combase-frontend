import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

const getChannelMessagesSelector = ({ actions: { loadMore }, hasMore, loadingMore, messages }) => [messages, {
	hasMore,
	loadingMore,
	loadMore,
}];

export const useChannelMessages = () => useContextSelector(ChannelContext, getChannelMessagesSelector);

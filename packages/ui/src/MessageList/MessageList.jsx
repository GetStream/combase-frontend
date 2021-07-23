import React, { useCallback, useRef } from 'react';
import { 
	DateSeparator as DefaultDateSeparator,
	EventComponent,
	EmptyStateIndicator as DefaultEmptyStateIndicator,
	LoadingIndicator as DefaultLoadingIndicator,
	MessageNotification as DefaultMessageNotification,
	isDate,
	useChannelActionContext, 
	useComponentContext, 
	useChannelStateContext,
	useEnrichedMessages,
	Message,
} from 'stream-chat-react';

import usePrependedMessagesCount from './usePrependedMessagesCount';
import VirtualizedList from '../VirtualizedList';

const listStyle = {
	backfaceVisibility: 'hidden',
};

const PREPEND_OFFSET = 10 ** 7;
const OVERSCAN = 100;

const MessageList = ({
    disableDateSeparator = false,
	headerPosition,
    hideDeletedMessages = false,
    hideNewMessageSeparator = false,
    messageLimit = 100,
    overscan = OVERSCAN,
    shouldGroupByUser = false,
	threadList = false,
}) => {
	const { loadMore } = useChannelActionContext();
  	const { channel, hasMore, loadingMore, messages } = useChannelStateContext();

	const {
		DateSeparator = DefaultDateSeparator,
		EmptyStateIndicator = DefaultEmptyStateIndicator,
		LoadingIndicator = DefaultLoadingIndicator,
		MessageNotification = DefaultMessageNotification,
		MessageSystem = EventComponent,
		Message: MessageUIComponent,
	} = useComponentContext();

    const virtuoso = useRef(undefined);

	const { messageGroupStyles, messages: enrichedMessages } = useEnrichedMessages({
		channel,
		disableDateSeparator,
		headerPosition,
		hideDeletedMessages,
		hideNewMessageSeparator,
		messages,
		noGroupByUser: !shouldGroupByUser,
		threadList,
	});

	const numItemsPrepended = usePrependedMessagesCount(enrichedMessages);

    const itemContent = useCallback((messageList, virtuosoIndex, groupStylesList) => {
		const streamMessageIndex = virtuosoIndex + numItemsPrepended - PREPEND_OFFSET;

		const message = messageList[streamMessageIndex];
		const groupStyles = groupStylesList[message?.id] || '';

		if (!message) return <div style={{ height: '1px' }}></div>; // returning null or zero height breaks the virtuoso
		
		if (message.customType === 'message.date' && message.date && isDate(message.date)) {
			return <DateSeparator date={message.date} unread={message.unread} />;
		}

		if (message.type === 'system') {
			return <MessageSystem message={message} />;
		}

		return (
			<Message
				groupStyles={[groupStyles]}
				message={message}
				Message={MessageUIComponent}
			/>
		);
	}, [numItemsPrepended]);

	const handleStartReached = useCallback(() => {
		if (hasMore && loadMore) {
			loadMore(messageLimit);
		}
	}, [hasMore, loadMore, messageLimit]);

    return (
		<VirtualizedList
			alignToBottom
			firstItemIndex={PREPEND_OFFSET - numItemsPrepended}
			followOutput="smooth"
			initialTopMostItemIndex={enrichedMessages && enrichedMessages.length > 0 ? enrichedMessages.length - 1 : 0}
			itemContent={(i) => itemContent(enrichedMessages, i, messageGroupStyles)}
			loading={hasMore && !messages?.length || loadingMore}
			overscan={overscan}
			ref={virtuoso}
			startReached={handleStartReached}
			style={listStyle}
			totalCount={enrichedMessages?.length || 0}
		/>
    );
};

export default MessageList;
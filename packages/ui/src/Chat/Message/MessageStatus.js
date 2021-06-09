import React from 'react';
import { useChatContext, useMessageContext } from 'stream-chat-react';

import { DoneAllIcon, DoneIcon } from '../../icons';
import Tooltip from '../../Tooltip';

const MessageStatus = () => {
	const { client } = useChatContext();
	const { isMyMessage, lastReceivedId, message, readBy } = useMessageContext();

	if (!isMyMessage() || message.type === 'error') {
		return null;
	}

	if (message.status === 'sending') {
		return <DoneIcon color="altText" size={1} />
	}

	if (message.status === 'received' && message.id === lastReceivedId) {
		const read = readBy.filter((item) => item.id !== client.user?.id).length;
		return <Tooltip><DoneAllIcon color={read ? "primary" : 'altText'} size={1} /></Tooltip>;
	}

	return null;
};

export default MessageStatus;
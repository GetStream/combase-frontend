import React from 'react';
import styled from 'styled-components';
import { useChatContext, useMessageContext } from 'stream-chat-react';

import { DoneAllIcon, DoneIcon } from '../../icons';
import Tooltip from '../../Tooltip';

const MessageStatus = ({ className }) => {
	const { client } = useChatContext();
	const { isMyMessage, lastReceivedId, message, readBy } = useMessageContext();

	if (!isMyMessage() || message.type === 'error') {
		return null;
	}

	if (message.status === 'sending') {
		return <DoneIcon className={className} color="altText" size={1} />
	}

	if (message.status === 'received' && message.id === lastReceivedId) {
		const read = readBy.filter((item) => item.id !== client.user?.id).length;
		return <Tooltip><DoneAllIcon className={className} color={read ? "primary" : 'altText'} size={1} /></Tooltip>;
	}

	return null;
};

export default styled(MessageStatus)``;
import React from 'react';
import styled from 'styled-components';
import { useMessageContext, showMessageActionsBox, MESSAGE_ACTIONS } from 'stream-chat-react';
import { interactions } from '@combase.app/styles';

import Box from '../Box';
import { ChatOpenIcon, EmojiIcon, MoreIcon } from '../icons';
import MessageActions from './MessageActions';

const Action = styled(Box)`
	width: ${({ theme }) => theme.sizes[6]};
	height: ${({ theme }) => theme.sizes[6]};
	display: flex;
	align-items: center;
	justify-content: center;
	${interactions};
`;

const Root = (props) => {
	const {
		className,
		displayReplies = true,
		handleOpenThread: propHandleOpenThread,
		messageWrapperRef,
	} = props;

	const {
		getMessageActions,
		handleOpenThread: contextHandleOpenThread,
		initialMessage,
		isMyMessage,
		message,
		onReactionListClick,
		threadList,
	} = useMessageContext();

	const handleOpenThread = propHandleOpenThread || contextHandleOpenThread;
	const messageActions = getMessageActions();
  	const showActionsBox = showMessageActionsBox(messageActions);

	const shouldShowReactions = messageActions.indexOf(MESSAGE_ACTIONS.react) > -1;
  	const shouldShowReplies =
    	messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && displayReplies && !threadList;

	if (
		!message.type ||
		message.type === 'error' ||
		message.type === 'system' ||
		message.type === 'ephemeral' ||
		message.status === 'failed' ||
		message.status === 'sending' ||
		initialMessage
	) {
		return null;
	}

	return (
		<Box backgroundColor="surface" boxShadow={0} className={className} paddingX="small">
			{/* {shouldShowReplies && (
				<Action interaction="opacity" onClick={handleOpenThread}>
					<ChatOpenIcon />
				</Action>
			)}
			{shouldShowReactions && (
				<Action interaction="opacity" onClick={onReactionListClick}>
					<EmojiIcon />
				</Action>
			)} */}
			{showActionsBox ? (
				<MessageActions>
					<Action interaction="opacity">
						<MoreIcon />
					</Action>
				</MessageActions>
			) : null}
		</Box>
	);
};

const MessageOptions = styled(Root)`
	position: absolute;
	top: 0;
	right: 0;
	display: inline-flex;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.radii[2]};
	display: none;
	transform: translateY(-50%);
`;

export default MessageOptions;
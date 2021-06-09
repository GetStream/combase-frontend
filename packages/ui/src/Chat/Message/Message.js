import React from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles'
import { MessageInput, useComponentContext, useMessageContext } from 'stream-chat-react';
import format from 'date-fns/format';

import Avatar from '../../Avatar';
import Box from '../../Box';
import Container from '../../Container';
import Text from '../../Text';

import MessageActions from './MessageActions';
import MessageDate from './MessageDate';
import MessageMeta from './MessageMeta';
import MessageStatus from './MessageStatus';

const avatarSize = 8;

const Root = styled(Container).attrs({
    gridGap: 3,
})`
    ${interactions};
    display: grid;
    grid-template-columns: ${({ theme }) => theme.sizes[avatarSize]} 1fr;
    grid-auto-rows: min-content;

	.str-chat__message-attachment {
		overflow: hidden;
		width: 100%;
		max-width: 375px;
		border-radius: 16px;
		margin: 8px auto 8px 0;
		padding: 0;
	}

	.str-chat__message-attachment--image {
		margin: 8px 0;
		max-width: 480px;
		height: auto;
		max-height: 300px;
		max-width: 100%;
		cursor: zoom-in;

		& img {
			border-radius: 16px;
			height: inherit;
			width: auto;
			max-height: inherit;
			max-width: 100%;
			display: block;
			object-fit: cover;
			overflow: hidden;
		}
	}

	.str-chat__gallery {
		margin: 5px 0;
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		overflow: hidden;
	}

	.str-chat__gallery-image {
		width: 150px;
		height: 150px;
		background: white;
		margin-bottom: 1px;
		margin-right: 1px;
	}

	.str-chat__gallery-image img {
		width: inherit;
		height: inherit;
		object-fit: cover;
	}
`;

const AvatarCol = styled(Box)`
    display: flex;
    justify-content: flex-end;

    & > ${MessageDate} {
        align-self: flex-start;
        font-variation-settings: 'wght' 300;
        opacity: 0;
		display: none;
    }

	& > ${MessageStatus} {
		align-self: center;
	}

    ${Root}:hover & > ${MessageDate} {
        opacity: 0.5;
		display: inherit;
    }
`;

const MessageText = styled(Text).attrs(({ largeEmoji }) => ({
    fontSize: !largeEmoji ? '15px' : 7,
    fontWeight: 400,
    lineHeight: !largeEmoji ? 6 : 8,
}))``;

const Message = () => {
	const { 
		editing,
		groupStyles: [grouping = 'single'] = [], 
		isMyMessage, 
		handleRetry,
		message,
		clearEditingState,
	} = useMessageContext();

	const isOwned = isMyMessage();
	const type = message?.type;
	const noAvatar = type === 'ephemeral' || (grouping !== 'top' && grouping !== 'single');

	const {
		Attachment,
		EditMessageInput,
	} = useComponentContext();

	return (
		<Root
			color="text"
			maxWidth={21}
			variant="contain"
			paddingTop={noAvatar ? 1 : 3} 
			paddingBottom={noAvatar ? 1 : 2}
			interaction={type !== 'ephemeral' ? 'hover' : undefined}
		>
			<AvatarCol>
				{noAvatar ? (
					<>
						<MessageDate fontSize={2} lineHeight={6}>{format(message.created_at, 'hh:mma')}</MessageDate>
						<MessageStatus />
					</>
				) : (
					<Avatar src={message?.user?.avatar} name={message?.user?.name} size={avatarSize} />
				)}
			</AvatarCol>
			<Box>
				{!noAvatar ? (
					<MessageMeta
						date={message?.created_at}
						errorStatusCode={message?.errorStatusCode}
						name={isOwned ? 'You' : message?.user?.name}
						onRetry={() => handleRetry(message)}
						ours={isOwned}
						status={message?.status}
						type={type}
					/>
				) : null}
				{
					!editing ? (
						<>
							<MessageText opacity={type!=='deleted' ? 1 : 0.5}>{type === "deleted" ? 'Message Deleted' : message.text}</MessageText>
							<Attachment attachments={message.attachments} />
						</>
					) : (
						<MessageInput
							clearEditingState={clearEditingState}
							grow
							Input={EditMessageInput}
							message={message}
						/>
					)
				}
			</Box>
			{type !== 'deleted' ? <MessageActions /> : null}
		</Root>
	);
}

export default Message;
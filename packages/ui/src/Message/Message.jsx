import React, { useRef } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles'
import { 
	MessageInput,
	MessageTimestamp as DefaultMessageTimestamp,
	MessageStatus as DefaultMessageStatus,
	MessageDeleted as DefaultMessageDeleted,
	MessageText as DefaultMessageText,
	MessageOptions as DefaultMessageOptions,
	useComponentContext,
	useMessageContext,
	renderText as defaultRenderText
} from 'stream-chat-react';
import format from 'date-fns/format';

import Box from '../Box';
import Container from '../Container';

import MessageOptions from './MessageOptions';
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

	&:hover ${MessageOptions} {
		display: inline-flex;
	}

	.str-chat__message-attachment {
		overflow: hidden;
		width: 100%;
		max-width: 375px;
		border-radius: 16px;
		${'' /* margin: 8px auto 8px 0; */}
		padding: 0;
	}

	/** Image Attachments **/

	.str-chat__message-attachment--image {
		${'' /* margin: 8px 0; */}
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

	.str-chat__gallery--square {
		max-width: 304px;
		.str-chat__gallery-image:nth-child(even) {
			margin-right: 0;
		}
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

	.str-chat__gallery-placeholder {
		position: relative;
		width: 150px;
		height: 150px;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: top left;
		background-repeat: no-repeat;
		cursor: zoom-in;

		:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.69);
			z-index: 0;
		}
	}
	/** File Attachments **/
	.str-chat__message-attachment-file--item {
		position: relative;
		height: 48px;
		display: flex;
		align-items: center;
		font-size: ${({theme}) => theme.fontSizes[3]};
		line-height: 20px;
		width: auto;
	}
	
	.str-chat__message-attachment-file--item img, .str-chat__message-attachment-file--item svg {
		margin-right: ${({theme}) => theme.space[3]};
	}

	.str-chat__message-attachment-file--item-text {
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.str-chat__message-attachment-file--item a {
		font-weight: 600;
		color: ${({theme}) => theme.colors.text};
		opacity: 0.8;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.str-chat__message-attachment-file--item a::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.str-chat__message-attachment-file--item span {
		line-height: 14px;
		font-size: ${({theme}) => theme.fontSizes[2]};
		font-variation-settings: 'wght' 400;
		text-transform: uppercase;
		display: block;
		color: ${({theme}) => theme.colors.text};
		opacity: 0.5;
	}
`;

const AvatarCol = styled(Box)`
    display: flex;
    justify-content: flex-end;

    & > ${MessageDate} {
        align-self: flex-start;
		position: absolute;
		top: 6px;
		right: 0;
        font-variation-settings: 'wght' 500;
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
    
	${Root}:hover & > ${MessageStatus} {
		display: none;
    }
`;

const StyledMessageText = styled(({ className, ...props }) => <DefaultMessageText customInnerClass={className} {...props} />)`
	border: 0;
	padding: 0;
	& p {
		font-size: 15px;
		font-weight: 400;
		line-height: ${({ theme }) => theme.fontSizes[6]};
		font-family: ${({ theme }) => theme.fonts.text};
	}
`;

const Message = () => {
	const { 
		editing,
		groupStyles: [grouping = 'single'] = [], 
		isMyMessage, 
		handleRetry,
		message,
		clearEditingState,
		renderText = defaultRenderText,
	} = useMessageContext();

	const messageWrapperRef = useRef();

	const isOwned = isMyMessage();
	const type = message?.type;
	const noAvatar = type === 'ephemeral' || (grouping !== 'top' && grouping !== 'single');

	const {
		Avatar,
		Attachment,
		EditMessageInput,
		MessageDeleted = DefaultMessageDeleted,
		MessageTimestamp = DefaultMessageTimestamp,
		MessageOptions = DefaultMessageOptions,
		MessageStatus = DefaultMessageStatus,
		MessageText = StyledMessageText,
	} = useComponentContext();

	return (
		<Root
			color="text"
			paddingTop={noAvatar ? 1 : 3} 
			paddingBottom={noAvatar ? 1 : 2}
			interaction={type !== 'ephemeral' ? 'hover' : undefined}
			ref={messageWrapperRef}
		>
			<AvatarCol>
				{noAvatar ? (
					<>
						<MessageTimestamp fontSize={2} lineHeight={6} />
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
					message.deleted_at || message.type === 'deleted' ? (
						<MessageDeleted message={message} />
					) : editing ? (
						<MessageInput
							clearEditingState={clearEditingState}
							grow
							Input={EditMessageInput}
							message={message}
						/>
					) : (
						<>
							<MessageText />
							<Attachment attachments={message.attachments} />
						</>
					)
				}
				<MessageOptions messageWrapperRef={messageWrapperRef} />
			</Box>
		</Root>
	);
}

export default Message;
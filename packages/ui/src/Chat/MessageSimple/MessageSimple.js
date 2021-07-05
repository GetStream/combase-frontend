import React from 'react';
import styled, { css } from 'styled-components';
import format from 'date-fns/format';
import { useComponentContext, useMessageContext } from 'stream-chat-react';
// import 'stream-chat-react/dist/css/index.css';
import Box from '../../Box';
import Container from '../../Container';
import Text from '../../Text';

import { SystemMessage } from '../SystemMessage';
import { MessageBubble } from './MessageBubble';
import { MessageMeta, Root as MessageMetaRoot } from './MessageMeta';

const rootStyles = {
    bottom: () => css`
        padding-top: 2px;
        padding-bottom: 0.5rem;
    `,
    middle: () => css`
        padding-bottom: 2px;
        padding-top: 2px;

        & ${MessageMetaRoot} {
            display: none;
        }
    `,
    single: () => css`
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    `,
    top: () => css`
        ${'' /* &[data-grouping='top'] {
            &:before {
                content: attr(data-date);
                border-radius: 1rem;
                background-color: ${({ theme }) => theme.colors.text};
                color: ${({ theme }) => theme.colors.surface};
                font-size: 0.75rem;
                line-height: 1.25rem;
				font-family: ${({ theme }) => theme.fonts.text};
                padding: 0 .75rem;
				align-self: center;
				bottom: .5rem;
				position: relative;
            }
        } */}

        padding-top: .5rem;
        padding-bottom: 2px;

        & ${MessageMetaRoot} {
            display: none;
        }
    `,
};

const Root = styled(Container)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${({ $ours }) => ($ours ? 'flex-end' : 'flex-start')};

    ${({ $grouping }) => rootStyles[$grouping]?.() || ''};
`;

const AttachmentWrapper = styled(Box)`
	.str-chat__message-attachment {
		overflow: hidden;
		width: 100%;
		max-width: 375px;
		border-radius: 16px;
		${'' /* margin: 8px auto 8px 0; */}
		padding: 0;
	}

	.str-chat__message-attachment--image {
		padding: 8px 0;
		max-width: 480px;
		height: auto;
		max-height: 150px;
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
		padding: 5px 0;
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
		${'' /* margin-bottom: 1px;
		margin-right: 1px; */}
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
`;

const MessageSimple = React.memo(() => {
    const msgContext = useMessageContext();

	const { 
		editing,
		groupStyles: [grouping = 'single'] = [], 
		isMyMessage, 
		message,
		clearEditingState,
	} = msgContext;

	const {
		Attachment,
		EditMessageInput,
	} = useComponentContext();

	const isOwned = isMyMessage();
	const type = message?.type;

    return (
        <Root
            $grouping={grouping}
            $ours={isOwned}
            data-date={message?.created_at ? format(message.created_at, 'eeee') : undefined}
            data-grouping={grouping}
        >
            {message?.attachments?.length ? (
                <AttachmentWrapper paddingBottom={1}>
                    <Attachment attachments={message.attachments} />
                </AttachmentWrapper>
            ) : null}
            {!message?.command && message?.text ? (
                <MessageBubble $grouping={grouping} $ours={isOwned} className={grouping}>
                    <Text fontSize={[2, 2, 3]} lineHeight={[4, 4, 5]}>
                        {message?.text}
                    </Text>
                </MessageBubble>
            ) : null}
            {grouping !== 'top' && grouping !== 'middle' ? (
                <MessageMeta
                    args={message?.args}
                    attachments={message?.attachments}
                    command={message?.command}
                    date={message?.created_at}
                    ours={isOwned}
                    type={message?.type}
                />
            ) : null}
        </Root>
    );
});

export default MessageSimple;
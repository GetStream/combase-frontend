import React from 'react';
import styled, { css } from 'styled-components';
import format from 'date-fns/format';
import { useMessageContext } from 'stream-chat-react';

import Box from '../../Box';
import Container from '../../Container';
import Text from '../../Text';

import { SystemMessage } from '../SystemMessage';
import { MessageAttachments } from '../MessageAttachments';
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

export const MessageSimple = React.memo(({ index }) => {
    const { 
		editing,
		groupStyles: [grouping = 'single'] = [], 
		isMyMessage, 
		message,
		clearEditingState,
	} = useMessageContext();

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
                <Box paddingBottom={1}>
                    <MessageAttachments message={message} />
                </Box>
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

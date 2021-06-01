import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Avatar, Box, Container, Text } from '@combase.app/ui'
import { interactions } from '@combase.app/styles'
import { useMessageContext } from 'stream-chat-react';
import format from 'date-fns/format';

import MessageDate from './MessageDate';
import MessageMeta from './MessageMeta';

const avatarSize = 8;

const Root = styled(Container).attrs({
    gridGap: 3,
})`
    ${interactions};
    display: grid;
    grid-template-columns: ${({ theme }) => theme.sizes[avatarSize]} 1fr;
    grid-auto-rows: min-content;
`;

const AvatarCol = styled(Box)`
    display: flex;
    justify-content: flex-end;

    & > ${MessageDate} {
        align-self: flex-start;
        font-variation-settings: 'wght' 300;
        opacity: 0;
    }

    ${Root}:hover & > ${MessageDate} {
        opacity: 0.5;
    }
`;

const MessageText = styled(Text).attrs(({ largeEmoji }) => ({
    fontSize: !largeEmoji ? '15px' : 7,
    fontWeight: 400,
    lineHeight: !largeEmoji ? 6 : 8,
}))``;

const Message = (props) => {
	const { groupStyles: [grouping], getMessageActions, isMyMessage, message, ...rest } = useMessageContext();
	const isOwned = isMyMessage();
	const noAvatar = message?.type === 'ephemeral' || (grouping !== 'top' && grouping !== 'single');
	
	return (
		<Root
			color="text"
			maxWidth={21}
			variant="contain"
			paddingTop={1} 
			paddingBottom={1}
			interaction={message?.type !== 'ephemeral' ? 'hover' : undefined}
		>
			<AvatarCol>
				{noAvatar ? (
					<MessageDate fontSize={2} lineHeight={6}>{format(message.created_at, 'hh:mma')}</MessageDate>
				) : (
					<Avatar src={message?.user?.avatar} name={message?.user?.name} size={avatarSize} />
				)}
			</AvatarCol>
			<Box>
				{!noAvatar ? (
					<MessageMeta
						date={message?.created_at}
						name={isOwned ? 'You' : message?.user?.name}
						ours={isOwned}
						status={message?.status}
						type={message?.type}
					/>
				) : null}
				<MessageText>{message.text}</MessageText>
			</Box>
		</Root>
	);
}

export default Message;
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';
import { useMessage, useUserRole } from '@combase.app/chat';
import format from 'date-fns/format';

import Avatar from '../../Avatar';
import Box from '../../Box';
import Container from '../../Container';
import IconLabel from '../../IconLabel';
import { CommandIcon } from '../../icons';
import Text from '../../Text';

import { isEmojiMessageRegex } from '../utils/isEmojiMessageRegex';

import { MessageAttachments } from '../MessageAttachments';
import { MessageDate } from './MessageDate';
import { MessageMeta } from './MessageMeta';

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

export const Message = React.memo(({ index }) => {
    const [message, grouping] = useMessage(index);

    const { isMyMessage } = useUserRole(message);
    const noAvatar = message?.type === 'ephemeral' || (grouping !== 'top' && grouping !== 'single');
    const largeEmoji = useMemo(() => isEmojiMessageRegex.test(message?.text), [message]);

    return (
		<Root
			$ours={isMyMessage}
			color="text"
			maxWidth={21}
			variant="contain"
			paddingTop={1} 
			paddingBottom={1}
			data-date={noAvatar && message?.created_at ? format(message.created_at, 'eeee, p') : undefined}
			data-grouping={grouping}
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
						name={isMyMessage ? 'You' : message?.user?.name}
						ours={isMyMessage}
						status={message?.status}
						type={message?.type}
					/>
				) : null}
				<Box>
					<MessageText largeEmoji={largeEmoji}>{message?.text}</MessageText>
					{message?.attachments?.length ? <MessageAttachments message={message} /> : null}
					{message?.command ? (
						<Box paddingTop={1}>
							<IconLabel color="blue" fontFamily="title">
								<CommandIcon />
								<Text variant="label">{`${message?.command}: ${message?.args}`}</Text>
							</IconLabel>
						</Box>
					) : null}
				</Box>
			</Box>
		</Root>
    );
});

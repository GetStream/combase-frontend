import React, { useMemo } from 'react';
import styled from 'styled-components';
import { interactions } from '@combase.app/styles';
import { useMessage, useUserRole } from '@combase.app/chat';
import format from 'date-fns/format';

import Avatar from '../../Avatar';
import { IconLabel } from '../../IconLabel';
import { CommandIcon } from '../../icons';
import { Box, Container } from '../../Layout';
import { Text } from '../../Text';

import { SystemMessage } from '../SystemMessage';
import { isEmojiMessageRegex } from '../utils/isEmojiMessageRegex';

import { MessageAttachments } from '../MessageAttachments';
import { MessageDate } from './MessageDate';
import { MessageMeta } from './MessageMeta';

const avatarSize = 7;

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
    fontSize: !largeEmoji ? 3 : 7,
    fontWeight: 400,
    lineHeight: !largeEmoji ? 5 : 8,
}))``;

export const Message = React.memo(({ index }) => {
    const [message, grouping] = useMessage(index);

    const { isMyMessage } = useUserRole(message);
    const noAvatar = message?.type === 'ephemeral' || (grouping !== 'top' && grouping !== 'single');
    const largeEmoji = useMemo(() => isEmojiMessageRegex.test(message?.text), [message]);

    if (message && (message.type === 'system' || message.display === 'system')) {
        return <SystemMessage text={message?.text} type={message.type} />;
    }

    return (
        <Box paddingTop={grouping === 'top' || grouping === 'single' ? 2 : 0} paddingBottom={0}>
            <Root
                $ours={isMyMessage}
                color="text"
                maxWidth={18}
                variant="contain"
                data-date={noAvatar && message?.created_at ? format(message.created_at, 'eeee, p') : undefined}
                data-grouping={grouping}
                interaction={message?.type !== 'ephemeral' ? 'hover' : undefined}
            >
                <AvatarCol paddingY={2}>
                    {noAvatar ? (
                        <MessageDate>{format(message.created_at, 'hh:mm')}</MessageDate>
                    ) : (
                        <Avatar avatar={message?.user?.avatar} name={message?.user?.name} size={avatarSize} />
                    )}
                </AvatarCol>
                <Box paddingY={noAvatar ? 1 : 0} paddingTop={noAvatar ? 1 : 2}>
                    {!noAvatar ? (
                        <MessageMeta
                            date={message?.created_at}
                            name={isMyMessage ? 'You' : message?.user?.name}
                            ours={isMyMessage}
                            status={message?.status}
                            type={message?.type}
                        />
                    ) : null}
                    <Box paddingTop={!noAvatar ? 'small' : 0}>
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
        </Box>
    );
});

import React, { useMemo } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { useChannelReadCursors } from '@combase.app/chat';
import { itemGap } from '@combase.app/styles';

import Box from '../../Box';
import IconLabel from '../../IconLabel';
import Text from '../../Text';
import { AttachmentIcon, CommandIcon } from '../../icons';

import { DeliveryStatus } from '../DeliveryStatus';
import { EphemeralNotice } from '../EphemeralNotice';

export const Root = styled(Box)`
    display: flex;
    flex-direction: ${({ $ours }) => ($ours ? 'row-reverse' : 'row')};
    align-items: center;
    user-select: none;

    & > * + * {
        ${itemGap};
    }
`;

const useIsRead = date => {
    const cursors = useChannelReadCursors();

    /** Uses Array.some to check if _any_ of the chat partners haven't read the message */
    /** Combase is 1:1-chat so this only ever really checks one user. - needs changing if we add additional users. */
    const hasSomeUnread = useMemo(() => Object.values(cursors || {}).some(({ last_read }) => last_read?.getTime() < date?.getTime()), [
        cursors,
        date,
    ]);

    return !hasSomeUnread;
};

export const MessageMeta = ({ args, attachments, className, command, date, ours, type }) => {
    const isRead = useIsRead(date);
    const isEphemeral = type === 'ephemeral';

    return (
        <>
            <Root $ours={ours} className={className} gapLeft={2} paddingY={1}>
                {!isEphemeral && ours ? <DeliveryStatus read={isRead} /> : null}
                {!isEphemeral && date ? (
                    <Box paddingX={1}>
                        <Text color="altText" fontSize={2} lineHeight={2}>
                            {format(date, 'p')}
                        </Text>
                    </Box>
                ) : null}
                {!command && attachments?.length ? (
                    <IconLabel color="blue" fontFamily="title">
                        <AttachmentIcon />
                        <Text variant="label">
                            {attachments.length > 1 ? 'Multiple Attachments' : `${attachments[0].type}: ${attachments[0].fallback}`}
                        </Text>
                    </IconLabel>
                ) : null}
                {command ? (
                    <IconLabel color="blue" fontFamily="title">
                        <CommandIcon />
                        <Text variant="label">{`${command}: ${args}`}</Text>
                    </IconLabel>
                ) : null}
            </Root>
            {isEphemeral ? <EphemeralNotice /> : null}
        </>
    );
};

import React, { useMemo } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { itemGap } from '@combase.app/styles';
import { useChannelReadCursors } from '@combase.app/chat';

import Box from '../../Box';
import { Text } from '../../Text';

import { EphemeralNotice } from '../EphemeralNotice';
import { DeliveryStatus } from '../DeliveryStatus';
import { MessageDate } from './MessageDate';

export const Root = styled(Box)`
    display: flex;
    flex-direction: row;
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

export const MessageMeta = ({ className, date, name, ours, status, type }) => {
    const isRead = useIsRead(date);
    const isEphemeral = type === 'ephemeral';

    return (
        <Root className={className} gapLeft={2}>
            <Text as="span" fontWeight="600" fontSize={3} lineHeight={3}>
                {name}
            </Text>
            {date ? <MessageDate marginLeft={1}>{format(date, 'p')}</MessageDate> : null}
            {isEphemeral && ours ? <EphemeralNotice /> : null}
			{!isEphemeral && ours ? <DeliveryStatus sending={status === 'sending'} read={isRead} /> : null}
        </Root>
    );
};

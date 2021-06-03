import React, { useMemo } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
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

export const MessageMeta = ({ args, attachments, className, command, date, ours, type }) => {
    const isRead = false;
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

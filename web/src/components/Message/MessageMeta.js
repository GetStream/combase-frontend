import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { itemGap } from '@combase.app/styles';
import { Box, Text } from '@combase.app/ui';

import MessageDate from './MessageDate';

export const Root = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;

    & > * + * {
        ${itemGap};
    }
`;

const MessageMeta = ({ className, date, name, ours, status, type }) => {
    return (
        <Root className={className} gapLeft={2}>
            <Text as="span" fontWeight="600" fontSize="15px" lineHeight={5}>
                {name}
            </Text>
            {date ? <MessageDate fontSize={2} lineHeight={2} marginLeft={1}>{format(date, 'p')}</MessageDate> : null}
			{type === 'deleted' ? <Text fontSize={2} lineHeight={2}>Deleted</Text> : null}
        </Root>
    );
};

export default MessageMeta;
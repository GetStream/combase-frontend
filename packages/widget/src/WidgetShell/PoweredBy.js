import React from 'react';
import { interactions, layout } from '@combase.app/styles';
import styled from 'styled-components';

import Box from '@combase.app/ui/build/Box';
import StreamLogo from '@combase.app/ui/build/StreamLogo';
import Text from '@combase.app/ui/build/Text';

const Root = styled(Box)`
    ${layout};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-color: ${({ theme }) => theme.colors.surface};

    & svg {
        height: unset;
        margin-right: 0.5rem;
    }
`;

const StreamChip = styled(Box).attrs({
    as: 'a',
    borderRadius: 3,
    minHeight: 5,
    paddingX: 2,
    paddingY: 0,
})`
    ${layout};
    display: flex;
    align-items: center;
    ${interactions};
    text-decoration: none;
`;

export const PoweredBy = () => (
    <Root paddingY={1}>
        <StreamChip color="text" interaction="highlight" href="https://getstream.io/chat" target="_blank" title="Stream Chat">
            <StreamLogo size={5} />
            <Text fontSize={2} lineHeight={2}>
                {'Powered by '}
                <strong>{'Stream'}</strong>
            </Text>
        </StreamChip>
    </Root>
);

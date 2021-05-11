import React from 'react';
import styled, { useTheme } from 'styled-components';
import { itemGap } from '@combase.app/styles';

import { InfoIcon } from '../icons';
import IconLabel from '../IconLabel';
import Label from '../Label';
import Box from '../Box';
import { Text } from '../Text';

const Root = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * + * {
        ${itemGap};
    }

    & ${Text} {
        vertical-align: middle;
        & > span {
            cursor: pointer;
            margin-left: ${({ theme: { space } }) => space[1]};
            opacity: 0.56;
            text-decoration: underline;
            &:hover {
                opacity: 1;
            }
        }
    }
`;

export const SystemMessage = React.memo(({ text, type }) => {
    const theme = useTheme();
    return (
        <Root gapTop={1} paddingY={3}>
            <Label color={theme.dark ? 'textA.8' : 'primary'}>
                <Text fontSize={2}>{text}</Text>
            </Label>
            {type === 'ephemeral' ? (
                <IconLabel>
                    <InfoIcon color="warning" size={1} />
                    <Text color="altText" variant="label">
                        {'Only you can see this.'}
                        <Text as="span" color="red" variant="label">
                            {'Dismiss ?'}
                        </Text>
                    </Text>
                </IconLabel>
            ) : null}
        </Root>
    );
});

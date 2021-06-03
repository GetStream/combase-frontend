import React from 'react';
import styled, { useTheme } from 'styled-components';
import { itemGap } from '@combase.app/styles';

import Box from '../../Box';
import {InfoIcon} from '../../icons';
import IconLabel from '../../IconLabel';
import Label from '../../Label';
import Text from '../../Text';

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

const SystemMessage = React.memo(({ message }) => {
    const theme = useTheme();

    return (
        <Root gapTop={1} paddingY={3}>
            <Label color={theme.dark ? 'text' : 'primary'} textColor={theme.dark ? 'text' : 'primary'} colorAlpha={0.08}>
                <Text fontSize={2}>{message.text}</Text>
            </Label>
            {message.type === 'ephemeral' ? (
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

export default SystemMessage;
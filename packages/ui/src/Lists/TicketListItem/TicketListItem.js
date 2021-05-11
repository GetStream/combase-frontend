import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import Avatar from '../../Avatar';
import { Label } from '../../Label';
import { Box } from '../../Layout';
import { Text } from '../../Text';
import { Placeholder } from '../../Placeholder';

import { Entity } from '../Entity';
import { ListItem } from '../ListItem';

const Labels = styled(Box)`
    & * + * {
        ${itemGap};
    }
`;

export const TicketListItem = ({ avatar, updatedAt, latestMessage, latestMessageAt, name, ...rest }) => (
    <ListItem columnTemplate="max-content 1fr max-content max-content" {...rest}>
        <Box paddingLeft={0} paddingRight={3}>
            <Entity icon={<Avatar name={name} size={4} src={avatar} />}>
                <Text as={!name ? Placeholder : undefined} fontSize={3} fontWeight="600" lineHeight={3}>
                    {name}
                </Text>
            </Entity>
        </Box>
        <Text as={!latestMessage ? Placeholder : undefined} fontSize={2} lineHeight={3} opacity={0.56} variant="clamped" placeholderWidth={14}>
            {latestMessage}
        </Text>
        <Labels gapLeft={2}>
            <Label color="teal">
                <Text variant="label">{'React'}</Text>
            </Label>
            <Label color="purple">
                <Text variant="label">{'Sales'}</Text>
            </Label>
        </Labels>
        <Box paddingX={3}>
            <Text as={!updatedAt ? Placeholder : undefined} fontSize={2} lineHeight={3} placeholderWidth={10}>
                {updatedAt}
            </Text>
        </Box>
    </ListItem>
);

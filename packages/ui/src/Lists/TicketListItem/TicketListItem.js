import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import Avatar from '../../Avatar';
import Label from '../../Label';
import Box from '../../Box';
import { Text } from '../../Text';
import Placeholder from '../../Placeholder';

import { Entity } from '../Entity';
import { ListItem } from '../ListItem';

const Status = styled(Box)`
    & * + * {
        ${itemGap};
    }
`;

export const TicketListItem = ({ avatar, updatedAt, latestMessage, latestMessageAt, name, status, ...rest }) => (
    <ListItem alignCheckbox="center" columnTemplate="max-content 1fr max-content max-content" {...rest}>
        <Box paddingLeft={0} paddingRight={3}>
            <Entity icon={<Avatar name={name} size={7} src={avatar} />}>
                <Text as={!name ? Placeholder : undefined} fontSize={3} fontWeight="600" lineHeight={3}>
                    {name}
                </Text>
            </Entity>
        </Box>
        <Text as={!latestMessage ? Placeholder : undefined} fontSize={2} lineHeight={3} opacity={0.56} variant="clamped" placeholderWidth={14}>
            {latestMessage}
        </Text>
        <Status gapLeft={2}>
            <Label color="green">
                <Text variant="label">{status}</Text>
            </Label>
        </Status>
        <Box paddingX={3}>
            <Text as={!updatedAt ? Placeholder : undefined} fontSize={2} lineHeight={3} placeholderWidth={10}>
                {updatedAt}
            </Text>
        </Box>
    </ListItem>
);

import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';
import { Avatar, Entity, Label, ListItem, Box, Text, Placeholder } from '@combase.app/ui';

const Status = styled(Box)`
    & * + * {
        ${itemGap};
    }
`;

const TicketListItem = ({ avatar, updatedAt, latestMessage, latestMessageAt, name, status, ...rest }) => (
    <ListItem alignCheckbox="center" columnTemplate="max-content 1fr max-content max-content max-content" {...rest}>
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
        <Box>
            <Entity icon={<Avatar name="Luke" size={5} />}>
				<Text as={!name ? Placeholder : undefined} fontSize={3} fontWeight="600" lineHeight={3}>
                    Luke
                </Text>
			</Entity>
        </Box>
        <Status gapLeft={2}>
            <Label color={`ticketStatus.${status}`}>
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

export default TicketListItem;
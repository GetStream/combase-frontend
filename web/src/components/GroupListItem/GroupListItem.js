import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, Box, IconLabel, Text, GroupEntity, ListItem, GroupIcon } from '@combase.app/ui';

export const GroupListItem = ({ avatar, color, createdAt, emoji, _id, groups, memberCount, name, role, ticketCount, onClick, ...rest }) => (
    <ListItem {...rest} alignCheckbox="center" onClick={() => onClick?.(_id)}>
        <Box>
            <GroupEntity color={color} emoji={emoji} name={name} role={role} />
        </Box>
        <Box paddingX={3}>
            <IconLabel color="text" size={2}>
                <GroupIcon />
                <Text variant="label">{memberCount || 0} members</Text>
            </IconLabel>
        </Box>
        <Box paddingX={3}>
            <IconLabel color="text" size={2}>
                <ClockIcon />
                <Text variant="label">{createdAt}</Text>
            </IconLabel>
        </Box>
    </ListItem>
);

GroupListItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
};

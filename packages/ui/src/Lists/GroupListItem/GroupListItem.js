import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ClockIcon, ConversationsIcon } from '../../icons';

import Box from '../../Box';
import IconLabel from '../../IconLabel';
import { Helper } from '../../Inputs';
import Text from '../../Text';

import { GroupEntity } from '../Entity';
import { ListItem } from '../ListItem';
import { GroupIcon } from '../../icons/index';

const Groups = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        margin-left: 0.5rem;
    }
`;

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

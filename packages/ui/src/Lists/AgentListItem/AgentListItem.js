import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ClockIcon, GroupIcon } from '../../icons';

import Box from '../../Box';
import { IconLabel } from '../../IconLabel';
import { Helper } from '../../Inputs/shared/Helper';
import { ListItem } from '../ListItem/ListItem';
import { AgentEntity } from '../Entity';
import { Chip } from '../../Chip';
import {Text} from '../../Text/Text';

const Groups = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        margin-left: 0.5rem;
    }
`;

const renderGroups = (groups, totalGroups) => (
    <>
        {groups?.map(group => (
            <Chip icon={GroupIcon} color={group?.node?.color} label={group?.node?.name} key={group?.node?._id} />
        ))}
        {totalGroups > 3 ? (
            <Text variant="label" color="altText">
                + {totalGroups - 3} more
            </Text>
        ) : null}
    </>
);

export const AgentListItem = ({ avatar, createdAt, _id, groups, name, meta, totalGroups, ticketCount, onClick, ...rest }) => (
    <ListItem columnTemplate="1fr 1.5fr 0.5fr 1fr" {...rest} alignCheckbox="center" onClick={() => onClick?.(_id)}>
        <Box paddingX={3}>
            <AgentEntity avatar={avatar} name={name} meta={meta} />
        </Box>
        <Groups paddingX={3}>{groups?.length ? renderGroups(groups, totalGroups) : <Helper text="No Groups" />}</Groups>
        <Box paddingX={3}>
            <Text>{ticketCount || 0} tickets</Text>
        </Box>
        <Box paddingX={3}>
            <IconLabel color="text" size={2}>
                <ClockIcon />
                <Text variant="label">{createdAt}</Text>
            </IconLabel>
        </Box>
    </ListItem>
);

AgentListItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
};

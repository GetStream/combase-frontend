import React from 'react';
import {useToggle} from 'react-use';

import { IconButton } from '../../Buttons';
import { InfoIcon } from '../../icons';

import { ChannelHeader } from '.';

// TODO API for setting active state and user data will likely change

const mockUser = {
  avatar: 'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512',
  last_active: new Date(),
  name: 'Luke',
};

export const Default = () => {
    const [starred, toggleStar] = useToggle();
    const [prioritized, togglePriority] = useToggle();

    return (
        <ChannelHeader handlePriorityClick={togglePriority} handleStarClick={toggleStar} isPriority={prioritized} isStarred={starred} lastActive={mockUser.last_active} user={mockUser}>
            <IconButton $color="altText" $size={1.5} icon={InfoIcon} />
        </ChannelHeader>
    );
}

export const UserActive = () => <ChannelHeader active lastActive={mockUser.last_active} user={mockUser} />;
export const Placeholder = () => <ChannelHeader />;

export default {
    component: ChannelHeader,
    title: "chat/ChannelHeader",
};

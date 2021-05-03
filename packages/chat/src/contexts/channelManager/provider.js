import React from 'react';
import { useMap } from 'react-use';

import { useChannels, useChannelManagerEvents } from '../../hooks';

import { ChannelManagerContext } from './context';

export const ChannelManager = ({ children, filters, sort, options }) => {
    const [channels, channelsActions, status] = useChannels(filters, sort, options);
    // Stores all members that share a channel with the authed user. We can update this list on events rather than have to deeply update each channel containing a given member.
    const [members, membersActions] = useMap();

    useChannelManagerEvents(channelsActions, membersActions);

    const context = {
        channels,
        channelsActions,
        members,
        membersActions,
        status,
    };

    return <ChannelManagerContext.Provider value={context}>{children}</ChannelManagerContext.Provider>;
};

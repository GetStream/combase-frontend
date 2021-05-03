import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';

import { IconButton } from '../../Buttons';
import { PriorityIcon, StarIcon } from '../../icons';

import { ChannelPreview } from './ChannelPreview';

const Root = styled.div`
    max-width: 280px;
`;

// TODO Mock channel data.
export const Default = () => {
    const [starred, toggleStar] = useToggle();
    const [prioritized, togglePriority] = useToggle();

    return (
        <Root>
            <ChannelPreview
                padding={2}
                toggles={[
                    <IconButton
                        className={starred ? 'active' : undefined}
                        color={starred ? 'yellow' : 'border'}
                        size={3}
                        icon={StarIcon}
                        key={0}
                        onClick={toggleStar}
                    />,
                    <IconButton
                        className={prioritized ? 'active' : undefined}
                        color={prioritized ? 'red' : 'border'}
                        size={3}
                        active={prioritized}
                        icon={PriorityIcon}
                        key={1}
                        onClick={togglePriority}
                    />,
                ]}
            />
        </Root>
    );
};

export const Unread = () => (
    <Root>
        <ChannelPreview unread />
    </Root>
);

export const Selected = () => (
    <Root>
        <ChannelPreview selected />
    </Root>
);

export const Compact = () => (
    <Root>
        <ChannelPreview compact />
    </Root>
);

export default {
    component: ChannelPreview,
    title: 'chat/ChannelPreview',
};

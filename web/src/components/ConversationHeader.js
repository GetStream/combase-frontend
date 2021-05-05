import React from 'react';
import { ChannelHeader, IconButton, InfoIcon, PriorityIcon, StarIcon, Tooltip } from '@combase.app/ui';
import { useChannelMembers, useChannelPartner, useUserTypingIndicator } from '@combase.app/chat';

const ConversationHeader = ({  onBackClick, onInfoClick, readonly, showBackBtn }) => {
    const members = useChannelMembers(); // Combine this hook with useChannelPartner - no need to always include both.
    const partner = useChannelPartner(members);
    const isTyping = useUserTypingIndicator(partner?.user.id);

    return (
        <ChannelHeader
            active={partner?.user?.online}
            isTyping={isTyping}
            lastActive={partner?.user?.last_active}
            onBackClick={onBackClick}
            showBackBtn={showBackBtn}
            toggles={[
                <Tooltip key={0} text="Star Conversation">
                    <IconButton color={false ? 'yellow' : 'altText'} active={false} icon={StarIcon} size={4} />
                </Tooltip>,
                <Tooltip key={1} text="Set Priority">
                    <IconButton color={false ? 'red' : 'altText'} active={false} icon={PriorityIcon} size={4} />
                </Tooltip>,
            ]}
            user={partner?.user}
        >
            {!readonly && onInfoClick ? (
                <>
                    <Tooltip text="More Info">
                        <IconButton color="altText" size={4} icon={InfoIcon} onClick={onInfoClick} />
                    </Tooltip>
                </>
            ) : null}
        </ChannelHeader>
    );
};

export default ConversationHeader;
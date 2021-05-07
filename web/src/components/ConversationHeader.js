import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, GET_TICKET } from '@combase.app/apollo';
import { ChannelHeader, IconButton, InfoIcon, TicketLabelToggle, Tooltip } from '@combase.app/ui';
import { useChannelPartner, useUserTypingIndicator } from '@combase.app/chat';
import { useTicketLabelToggles } from 'hooks';

const ConversationHeader = ({  onBackClick, onInfoClick, readonly, showBackBtn }) => {
	const { channelId } = useParams()
    const partner = useChannelPartner();
    const isTyping = useUserTypingIndicator(partner?.user.id);

	const queryOpts = useMemo(() => ({
		fetchPolicy: 'cache-and-network',
		variables: {
			_id: channelId
		}
	}), [channelId]);
	const { data: ticketQuery } = useQuery(GET_TICKET, queryOpts);
	const ticket = ticketQuery?.organization?.ticket;

	const [starTicket, setPriority] = useTicketLabelToggles();

    return (
        <ChannelHeader
            active={partner?.user?.online}
            isTyping={isTyping}
            lastActive={partner?.user?.last_active}
            onBackClick={onBackClick}
            showBackBtn={showBackBtn}
            toggles={[
                <Tooltip key={0} text="Star Conversation">
                    <TicketLabelToggle type="star" onChange={starTicket} value={ticket?.starred || false} />
                </Tooltip>,
                <Tooltip key={1} text="Set Priority">
                    <TicketLabelToggle type="priority" onChange={setPriority} value={ticket?.priority || 0} />
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
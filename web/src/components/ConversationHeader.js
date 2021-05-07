import React, { useCallback, useMemo } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, GET_TICKET, STAR_TICKET, SET_TICKET_PRIORITY, UPDATE_TICKET_LABELS_FRAGMENT } from '@combase.app/apollo';
import { ChannelHeader, IconButton, InfoIcon, TicketLabelToggle, Tooltip } from '@combase.app/ui';
import { useChannelPartner, useUserTypingIndicator } from '@combase.app/chat';

const ConversationHeader = ({  onBackClick, onInfoClick, readonly, showBackBtn }) => {
	const { channelId } = useParams()
    const partner = useChannelPartner();
    const isTyping = useUserTypingIndicator(partner?.user.id);

	const { addToast } = useToasts();

	const queryOpts = useMemo(() => ({
		fetchPolicy: 'cache-and-network',
		variables: {
			_id: channelId
		}
	}), [channelId]);
	const { data: ticketQuery } = useQuery(GET_TICKET, queryOpts);
	const ticket = ticketQuery?.organization?.ticket;

	const [starTicket, { loading: starring, error: starError }] = useMutation(STAR_TICKET);
	const [setTicketPriority, { loading: prioritizing, error: priorityError }] = useMutation(SET_TICKET_PRIORITY);

	const handleStarTicket = useCallback(async (e) => {
		try {
			if (!channelId) {
				return;
			}
			await starTicket({
				optimisticResponse: {
					ticketStar: {
						record: {
							_id: channelId,
							__typename: 'Ticket',
							starred: e.target.checked,
						},
						__typename: 'UpdateByIdTicketPayload',
					}
				},
				update: (cache, { data: { ticketStar } }) => {
					const {record: ticket} = ticketStar;
					cache.writeFragment({
						data: ticket,
						fragment: UPDATE_TICKET_LABELS_FRAGMENT,
					})
				},
				variables: {
					_id: channelId,
					starred: e.target.checked
				}
			});
			const verb = e.target.checked ? 'starred' : 'unstarred';
			addToast(`Ticket ${verb}.`, {
				appearance: 'success',
				autoDismiss: true,
			})
		} catch (error) {
			addToast('Failed to star this ticket.', {
				appearance: 'error',
				autoDismiss: true,
			})	
		}
	}, [channelId]);
	
	const handleSetPriority = useCallback(async (e) => {
		try {
			if (!channelId) {
				return;
			}
			
			await setTicketPriority({
				optimisticResponse: {
					ticketSetPriority: {
						record: {
							_id: channelId,
							__typename: 'Ticket',
							priority: e.target.value,
						},
						__typename: 'UpdateByIdTicketPayload',
					}
				},
				update: (cache, { data: { ticketSetPriority } }) => {
					const {record: ticket} = ticketSetPriority;
					cache.writeFragment({
						data: ticket,
						fragment: UPDATE_TICKET_LABELS_FRAGMENT,
					})
				},
				variables: {
					_id: channelId,
					level: e.target.value,
				}
			});
			
			const adjMap = ['low', 'mid', 'high']
			addToast(`Ticket marked as ${adjMap[e.target.value]}-priority.`, {
				appearance: 'success',
				autoDismiss: true,
			})
		} catch (error) {
			addToast('Failed to set priority for this ticket.', {
				appearance: 'error',
				autoDismiss: true,
			})	
		}
	}, [channelId]);

    return (
        <ChannelHeader
            active={partner?.user?.online}
            isTyping={isTyping}
            lastActive={partner?.user?.last_active}
            onBackClick={onBackClick}
            showBackBtn={showBackBtn}
            toggles={[
                <Tooltip key={0} text="Star Conversation">
                    <TicketLabelToggle type="star" onChange={handleStarTicket} value={ticket?.starred || false} />
                </Tooltip>,
                <Tooltip key={1} text="Set Priority">
                    <TicketLabelToggle type="priority" value={ticket?.priority || 0} onChange={handleSetPriority} />
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
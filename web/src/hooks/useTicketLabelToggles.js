import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { useMutation, STAR_TICKET, SET_TICKET_PRIORITY, UPDATE_TICKET_LABELS_FRAGMENT } from '@combase.app/apollo';

// TODO: Pass ticketID to handleStar and handleSetPriority instead of from useParams
export const useTicketLabelToggles = () => {
	const { channelId } = useParams();
	const { addToast } = useToasts();

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

	return [handleStarTicket, handleSetPriority, {
		starring,
		starError,
		prioritizing,
		priorityError,
	}]
};
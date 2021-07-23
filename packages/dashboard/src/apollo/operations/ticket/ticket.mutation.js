import { gql } from '@apollo/client';

export const UPDATE_TICKET_LABELS_FRAGMENT = gql`
	fragment UpdateTicketLabels on Ticket {
		starred
		priority
	}
`;

export const TICKET_STATUS_FRAGMENT = gql`
	fragment TicketStatus on Ticket {
		_id
		status
	}
`;

export const ASSIGN_TICKET = gql`
	${TICKET_STATUS_FRAGMENT}
	mutation assignTicket($ticket: MongoID!, $agent: MongoID!, $status: EnumTicketStatus) {
		ticketAssign(ticket: $ticket, agent: $agent, status: $status) {
			...TicketStatus
		}
	}
`;

export const SET_TICKET_STATUS = gql`
	mutation starTicket($_id: MongoID!, $status: EnumTicketStatus!) {
		ticketSetStatus(_id: $_id, status: $status) {
			record {
				_id
				status
			}
		}
	}
`;

export const STAR_TICKET = gql`
	mutation starTicket($_id: MongoID!, $starred: Boolean!) {
		ticketStar(_id: $_id, starred: $starred) {
			record {
				_id
				starred
				priority
			}
		}
	}
`;

export const SET_TICKET_PRIORITY = gql`
	mutation setTicketPriority($_id: MongoID!, $level: Int!) {
		ticketSetPriority(_id: $_id, level: $level) {
			record {
				_id
				starred
				priority
			}
		}
	}
`;
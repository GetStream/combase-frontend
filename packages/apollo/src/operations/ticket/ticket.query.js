import { gql } from '@apollo/client';

export const CHANNEL_STATE_FRAGMENT = gql`
    fragment ChannelState on Ticket {
        latestMessage @client
        latestMessageAt @client
        unread @client
    }
`;

export const UNREAD_COUNT_FRAGMENT = gql`
    fragment UnreadCount on Ticket {
        unread @client
    }
`;

export const LATEST_MESSAGE_FRAGMENT = gql`
    fragment LatestMessage on Ticket {
        latestMessage @client
        latestMessageAt @client
    }
`;

export const NEW_TICKET_FRAGMENT = gql`
    fragment NewTicket on Ticket {
        _id
        user: userData {
            _id
            name
            email
            organization
        }
        status
        starred
        priority
        organization
        createdAt
        updatedAt
        latestMessage @client
        latestMessageAt @client
        unread @client
    }
`;

export const GET_TICKETS = gql`
    query getTickets($filter: FilterFindManyTicketInput) {
        organization {
			_id
            entities: tickets(filter: $filter) {
                edges {
                    node {
                        _id
						subject
                        user: userData {
                            _id
                            name
                            email
                            organization
                        }
                        status
                        organization
                        createdAt
                        updatedAt
                    }
                }
                count
            }
        }
    }
`;

export const GET_CONVERSATIONS = gql`
    query getTickets($filter: JSON!) {
        entities: tickets(filter: $filter) @client {
            edges {
                node {
                    _id
                    user: userData {
                        _id
                        name
                        email
                        organization
                    }
                    status
					starred
					priority
                    organization
                    createdAt
                    updatedAt
                    latestMessage
                    latestMessageAt
                    unread
                }
            }
            count
            hasMore
        }
    }
`;

export const GET_TICKET = gql`
    query getTicket($_id: MongoID!) {
        organization {
			_id
			ticket(_id: $_id) {
				_id
				user: userData {
					_id
					name
					email
					organization
					# feed
				}
				agents
				tags
				status
				starred
				priority
				organization
				createdAt
				source
				group
				updatedAt
			}
		}
    }
`;

export const GET_TICKET_DRAWER = gql`
    query getTicketDrawer($_id: MongoID!) {
        organization {
			_id
			ticket(_id: $_id) {
				_id
				user: userData {
					_id
					name
					email
				}
				tags
				status
				starred
				priority
				createdAt
			}

			integrations(filter: {
				enabled: true,
			}) {
				edges {
					node {
						_id
						uid
						parentDefinition {
							actions {
								location
								label
								description
								trigger
								payload
							}
						}
					}
				}
			}
		}
    }
`;

export const GET_TICKET_PARTNER = gql`
    query getTicketPartner($_id: MongoID!) {
        ticket(_id: $_id) {
            _id
            user: userData {
                _id
                name
                email
            }
        }
    }
`;

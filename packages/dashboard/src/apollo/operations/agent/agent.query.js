import { gql } from '@apollo/client';

export const GET_AGENTS = gql`
    query getAgents($filter: FilterFindManyAgentInput) {
        organization {
            _id
			name
            agents(filter: $filter, first: 100) {
                edges {
                    node {
                        _id
						active
                        avatar
                        name {
                            display
                            full
                        }
                        role
                        email
						access
						archived
                        organization
                        groups: parentGroups(first: 3) {
                            edges {
                                node {
                                    _id
                                    name
                                    color
                                }
                            }
                            count
                        }
                        createdAt
                        tickets {
                            count
                        }
                    }
                }
                count
            }
        }
    }
`;

export const GET_AGENT = gql`
    query getAgent($_id: MongoID!) {
        organization {
            _id
			name
            agent(_id: $_id) {
                _id
                avatar
				active
                name {
                    display
                    full
                }
				access
                role
                email
				archived
                organization
                groups
                createdAt
                timezone
                allTickets: tickets {
                    count
                }
				openTickets: tickets(filter: { status: open }) {
					count
				}
				closedTickets: tickets(filter: { status: closed }) {
					count
				}
            }
        }
    }
`;

export const SEARCH_AGENTS = gql`
    query searchAgents($query: String!) {
        organization {
            results: agentSearch(query: $query) {
                _id
                name {
                    display
                }
                email
                avatar
                role
            }
        }
    }
`;

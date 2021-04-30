import { gql } from '@apollo/client';

export const GET_AGENTS = gql`
    query getAgents($filter: FilterFindManyAgentInput) {
        organization {
            _id
            entities: agents(filter: $filter, first: 100) {
                edges {
                    node {
                        _id
                        avatar
                        name {
                            display
                            full
                        }
                        role
                        email
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
            agent(_id: $_id) {
                _id
                avatar
                name {
                    display
                    full
                }
                role
                email
                organization
                groups
                createdAt
                timezone
                tickets {
                    edges {
                        node {
                            _id
                            createdAt
                            updatedAt
                            user: userData {
                                _id
                                name
                                email
                            }
                        }
                    }
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

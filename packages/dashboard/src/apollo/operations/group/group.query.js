import { gql } from '@apollo/client';

export const GET_GROUP = gql`
    query getGroup($_id: MongoID!) {
        organization {
            _id
            group(_id: $_id) {
                _id
                color
                name
                description
                emoji
                organization
                tags: childTags {
                    edges {
                        node {
                            name
                            organization
                        }
                    }
                    count
                }
                members {
                    edges {
                        node {
                            _id
                            name {
                                display
                            }
                            avatar
                            role
                        }
                    }
                    count
                }
            }
        }
    }
`;

export const GET_GROUPS = gql`
    query getGroups {
        organization {
            _id
            entities: groups {
                edges {
                    node {
                        _id
                        color
                        createdAt
                        emoji
                        members {
                            count
                        }
                        name
                        organization
                    }
                }
                count
            }
        }
    }
`;

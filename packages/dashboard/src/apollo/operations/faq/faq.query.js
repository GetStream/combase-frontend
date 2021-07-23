import { gql } from '@apollo/client';

export const NEW_FAQ_FRAGMENT = gql`
    fragment NewFaq on Faq {
        shortId
        content
        organization
        createdBy
    }
`;

export const GET_FAQ = gql`
    query getFAQ($shortId: String!) {
        me {
            _id
        }

        organization {
            _id
            faq(shortId: $shortId) {
                _id
                content
                organization
                shortId
                status
                createdAt
                createdBy
                tags: childTags {
                    edges {
                        node {
                            name
                            organization
                        }
                    }
                    count
                }
            }
        }
    }
`;

export const GET_FAQS = gql`
    query getFAQs($filter: FilterFindManyFaqInput) {
        me {
            _id
        }

        organization {
            _id
            entities: faqs(filter: $filter) {
                edges {
                    node {
                        _id
                        excerpt @client
                        shortId
                        status
                        title @client
                        organization
                        createdAt
                        createdBy
                        tags: childTags(first: 4) {
                            edges {
                                node {
                                    name
                                    organization
                                }
                            }
                            count
                        }
                    }
                }
                count
            }
        }
    }
`;

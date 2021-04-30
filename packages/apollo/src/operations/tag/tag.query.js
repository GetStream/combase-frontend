import { gql } from '@apollo/client';

export const GET_TAGS = gql`
    query getTags {
        organization {
            _id
            entities: tags {
                edges {
                    node {
                        _id
                        name
                        organization
                    }
                }
            }
        }
    }
`;

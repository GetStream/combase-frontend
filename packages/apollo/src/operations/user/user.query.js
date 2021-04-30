import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser($_id: MongoID!) {
        user(_id: $_id) {
            _id
            name
            email
            organization
        }
    }
`;

export const GET_USERS = gql`
    query getUser($_id: MongoID!) {
        users {
            edges {
                node {
                    _id
                    name
                    email
                    organization
                }
            }
        }
    }
`;

import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
    mutation createGroup($record: CreateOneGroupInput!) {
        groupCreate(record: $record) {
            group: record {
                _id
                emoji
                color
                name
                organization
            }
        }
    }
`;

export const UPDATE_GROUP = gql`
    mutation updateGroup($_id: MongoID!, $record: UpdateByIdGroupInput!) {
        groupUpdate(_id: $_id, record: $record) {
            group: record {
                _id
                color
                name
                emoji
                organization
            }
        }
    }
`;

export const REMOVE_GROUP = gql`
    mutation removeGroup($_id: MongoID!) {
        groupRemove(_id: $_id) {
            group: record {
                _id
            }
        }
    }
`;

export const NEW_GROUP_FRAGMENT = gql`
    fragment NewGroup on Group {
        _id
        color
        name
        emoji
        organization
    }
`;

export const GROUP_ADD_TAG = gql`
    mutation addTagToGroup($_id: MongoID!, $name: String!) {
        groupAddTag(_id: $_id, name: $name)
    }
`;

export const GROUP_REMOVE_TAG = gql`
    mutation removeTagFromGroup($_id: MongoID!, $name: String!) {
        groupRemoveTag(_id: $_id, name: $name)
    }
`;

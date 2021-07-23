import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
    mutation createTag($name: String!) {
        tagCreate(name: $name) {
            record {
                name
            }
        }
    }
`;

export const UPDATE_TAG = gql`
    mutation updateTag($_id: MongoID!, $record: UpdateByIdTagInput!) {
        tagUpdate(_id: $_id, record: $record) {
            record {
                name
            }
        }
    }
`;

export const REMOVE_TAG = gql`
    mutation removeTag($name: String!) {
        tagRemove(name: $name) {
            record {
                name
            }
        }
    }
`;

export const REMOVE_TAGS = gql`
    mutation removeTags($filter: FilterRemoveManyTagInput!) {
        tagRemoveMany(filter: $filter) {
            numAffected
        }
    }
`;

export const NEW_TAG_FRAGMENT = gql`
    fragment NewTag on Tag {
        name
    }
`;

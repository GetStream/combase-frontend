import { gql } from '@apollo/client';

export const CREATE_FAQ = gql`
    mutation createFaq($record: CreateOneFaqInput!) {
        faqCreate(record: $record) {
            faq: record {
                _id
                content
                title @client
                body
                status
                shortId
                organization
                createdAt
                createdBy
            }
        }
    }
`;

export const UPDATE_FAQ = gql`
    mutation updateFaq($shortId: String!, $record: UpdateOneFaqInput!) {
        faqUpdate(shortId: $shortId, record: $record) {
            faq: record {
                _id
                content
                title @client
                shortId
                body
                status
                organization
                createdAt
                createdBy
            }
        }
    }
`;

export const REMOVE_FAQ = gql`
    mutation removeFaq($shortId: String!) {
        faqRemove(shortId: $shortId) {
            faq: record {
                shortId
            }
        }
    }
`;

export const FAQ_ADD_TAG = gql`
    mutation addTagToFaq($shortId: String!, $name: String!) {
        faqAddTag(shortId: $shortId, name: $name)
    }
`;

export const FAQ_REMOVE_TAG = gql`
    mutation removeTagFromFaq($shortId: String!, $name: String!) {
        faqRemoveTag(shortId: $shortId, name: $name)
    }
`;

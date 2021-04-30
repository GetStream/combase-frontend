import { gql } from '@apollo/client';

export const UPDATE_AGENT = gql`
    mutation updateAgent($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            agent: record {
                _id
                avatar
                name {
                    display
                    full
                }
                email
                organization
            }
        }
    }
`;

import { gql } from '@apollo/client';

export const GET_INTEGRATION_DEFINITIONS = gql`
    query getIntegrationDefitions {
        integrationDefinitions {
            icon
            id
            name
            internal {
                version
            }
        }
    }
`;

export const GET_INTEGRATION_DEFINITION = gql`
    query getIntegrationDefitions($id: String!) {
        integrationDefinition(id: $id) {
			configuration
            id
            icon
            name
            about
            internal {
                name
                version
            }
        }
    }
`;

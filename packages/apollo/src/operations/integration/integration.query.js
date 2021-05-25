import { gql } from '@apollo/client';

export const LOOKUP_INTEGRATION = gql`
    query lookupIntegration($uid: String!) {
        integrationLookup(uid: $uid) {
			_id
            enabled
            uid
			credentials {
				name
			}
        }
    }
`;

export const GET_INTEGRATION_DEFINITIONS = gql`
    query getIntegrationDefinitions {
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
    query getIntegrationDefinitions($id: String!) {
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

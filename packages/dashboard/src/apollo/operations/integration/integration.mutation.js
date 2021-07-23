import { gql } from '@apollo/client';

export const CREATE_INTEGRATION = gql`
	mutation createIntegration($uid: String!, $credentials: [IntegrationCredentialsInput!]) {
		integrationCreate(uid: $uid credentials: $credentials) {
			record {
				_id
				enabled
				uid
				credentials {
					name
				}
			}
		}
	}
`;

export const TOGGLE_INTEGRATION = gql`
	mutation toggleIntegration($_id: MongoID!, $enabled: Boolean!) {
		integrationToggle(_id: $_id, enabled: $enabled) {
			_id
			enabled
		}
	}
`;

export const INTEGRATION_ACTION = gql`
	mutation fireIntegrationAction($trigger: String!, $payload: JSON) {
		integrationAction(trigger: $trigger, payload: $payload)
	}
`;
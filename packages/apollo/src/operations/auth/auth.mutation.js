import { gql } from '@apollo/client';

import { authenticationVar } from '../../variables';

/**
 * Set the Authentication Credentials.
 * Sets the token to the reactive authenticationVar and persists with localStorage.
 * @param {string} token
 * @return {string} the latest token
 */
export const setAuthenticationCredentials = token => {
    localStorage.setItem('token', token);

    return authenticationVar(token);
};

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        agent: agentLogin(email: $email, password: $password) {
            token
        }
    }
`;

export const ONBOARD_USER_AND_ORG = gql`
    mutation createAgentAndOrganization($agent: AgentInput!, $organization: OrganizationInput!) {
        agent: createAgentAndOrganization(agent: $agent, organization: $organization) {
            token
        }
    }
`;

export const UPDATE_ORGANIZATION_PROFILE = gql`
    mutation updateOrganizationProfile($_id: MongoID!, $record: UpdateByIdOrganizationInput!) {
        organizationUpdate(_id: $_id, record: $record) {
            record {
				_id
				name
				branding {
					logo
					colors {
						primary
					}
				}
				contact {
					email
					phone
				}
			}
        }
    }
`;

export const WIDGET_SETTINGS_FRAGMENT = gql`
	fragment WidgetSettings on Organization {
		widget {
			domains
			defaultTheme
			home {
				title
				tagline
			}
			welcomeMessages
			unassignedMessages
		}
	}
`

export const UPDATE_WIDGET_SETTINGS = gql`
	${WIDGET_SETTINGS_FRAGMENT}
    mutation updateWidgetSettings($_id: MongoID!, $record: UpdateByIdOrganizationInput!) {
        organizationUpdate(_id: $_id, record: $record) {
            record {
				_id
				...WidgetSettings
			}
        }
    }
`;

import { gql } from "@apollo/client";

import { authenticationVar } from "../../variables";

/**
 * Set the Authentication Credentials.
 * Sets the token to the reactive authenticationVar and persists with localStorage.
 * @param {string} token
 * @return {string} the latest token
 */
export const setAuthenticationCredentials = (token) => {
  localStorage.setItem("token", token);
  localStorage.removeItem("combase-organization");

  return authenticationVar(token);
};

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    agent: agentLogin(email: $email, password: $password) {
      _id
      token
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation agentRequestPasswordReset($email: String!) {
    agent: agentRequestPasswordReset(email: $email) {
      _id
    }
  }
`;

export const RESET_PASSWORD = gql`
	mutation resetAgentPassword($_id: MongoID!, $password: String!) {
		agentResetPassword(_id:$_id, password:$password) {
			record {
				_id
			}
		}
	}
`;

export const ONBOARD_USER_AND_ORG = gql`
  mutation createAgentAndOrganization(
    $agent: AgentInput!
    $organization: OrganizationInput!
  ) {
    agent: agentOnboard(
      agent: $agent
      organization: $organization
    ) {
      _id
      token
    }
  }
`;

export const CREATE_AGENT = gql`
  mutation createAgent($record: CreateOneAgentInput!) {
    agentCreate(record: $record) {
      record {
        _id
        token
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_PROFILE = gql`
  mutation updateOrganizationProfile(
    $_id: MongoID!
    $record: UpdateByIdOrganizationInput!
  ) {
    organizationUpdate(_id: $_id, record: $record) {
      record {
        _id
        name
        branding {
          logo
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
      paths
      uitheme
      accent
      home {
        title
        tagline
      }
      welcomeMessages
      unassignedMessages
    }
  }
`;

export const UPDATE_WIDGET_SETTINGS = gql`
  ${WIDGET_SETTINGS_FRAGMENT}
  mutation updateWidgetSettings(
    $_id: MongoID!
    $record: UpdateByIdOrganizationInput!
  ) {
    organizationUpdate(_id: $_id, record: $record) {
      record {
        _id
        ...WidgetSettings
      }
    }
  }
`;

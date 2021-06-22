import { gql } from '@apollo/client';
import { WIDGET_SETTINGS_FRAGMENT } from './auth.mutation';

export const AGENT_PROFILE_FRAGMENT = gql`
	fragment AgentProfile on Agent {
		_id
		avatar
		name {
			full
			display
		}
		role
		timezone
	}
`;

export const GET_CURRENT_USER = gql`
    {
        isSmViewport: media(bp: "sm") @client

        me {
            _id
            name {
                full
                display
            }
			email
            avatar
            streamToken
			online @client
        }

        organization {
            _id
            name
            stream {
                key
            }
            theme
        }
    }
`;

export const GET_ORGANIZATION = gql`
    {
        organization {
            _id
            name
            stream {
                key
            }
            theme
        }
    }
`;

export const GET_ORGANIZATION_PROFILE = gql`
    {
        organization {
            _id
            name
			branding {
				logo
			}
			security {
				global2Fa
			}
            stream {
                key
            }
            agents {
                count
            }
			contact {
				phone
				email
			}
            theme
        }
    }
`;

export const GET_MY_PROFILE = gql`
	${AGENT_PROFILE_FRAGMENT}
    query getMyProfile {
        me {
            ...AgentProfile
        }
    }
`;

export const GET_WIDGET_SETTINGS = gql`
	${WIDGET_SETTINGS_FRAGMENT}
	query getWidgetSettings {
		organization {
			_id
			...WidgetSettings
		}
	}
`
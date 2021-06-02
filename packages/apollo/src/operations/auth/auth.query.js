import { gql } from '@apollo/client';
import { WIDGET_SETTINGS_FRAGMENT } from './auth.mutation';

export const GET_CURRENT_USER = gql`
    {
        isSmViewport: media(bp: "sm") @client

        me {
            _id
            name {
                full
                display
            }
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
            faqs {
                count
            }
            groups {
                count
            }
            agents {
                count
            }
			tags {
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
    query getMyProfile {
        me {
            _id
            name {
                full
                display
            }
            avatar
            email
            role
            timezone
			schedule {
                enabled
                day
                time {
                    start: startTime
                    end: endTime
                }
            }
        }
    }
`;

export const UPDATE_AGENT_PROFILE_FRAGMENT = gql`
	fragment UpdateAgentProfile on Agent {
		avatar
		name {
			full
			display
		}
		role
		email
		schedule {
			enabled
			day
			time {
				start: startTime
				end: endTime
			}
		}
		timezone
	}
`

export const GET_WIDGET_SETTINGS = gql`
	${WIDGET_SETTINGS_FRAGMENT}
	query getWidgetSettings {
		organization {
			_id
			...WidgetSettings
		}
	}
`
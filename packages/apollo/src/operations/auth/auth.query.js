import { gql } from '@apollo/client';

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

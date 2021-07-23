import { gql } from '@apollo/client';
import { AGENT_SCHEDULE_FRAGMENT } from '../auth';

export const UPDATE_AGENT = gql`
	${AGENT_SCHEDULE_FRAGMENT}
    mutation updateAgent($_id: MongoID!, $record: UpdateByIdAgentInput!) {
        agentUpdate(_id: $_id, record: $record) {
            agent: record {
                _id
                avatar
                name {
                    display
                    full
                }
				active
				archived
				access
				role
				timezone
                email
                organization
				theme {
					color
				}
				...AgentSchedule
            }
        }
    }
`;

import { gql } from "@apollo/client";
import { AGENT_PROFILE_FRAGMENT, AGENT_SCHEDULE_FRAGMENT } from "../auth";

export const UPDATE_AGENT = gql`
  ${AGENT_PROFILE_FRAGMENT}
  ${AGENT_SCHEDULE_FRAGMENT}
  mutation updateAgent($_id: MongoID!, $record: UpdateByIdAgentInput!) {
    agentUpdate(_id: $_id, record: $record) {
      agent: record {
        _id
        active
        archived
        access
        organization
        theme {
          color
        }
		...AgentProfile
        ...AgentSchedule
      }
    }
  }
`;

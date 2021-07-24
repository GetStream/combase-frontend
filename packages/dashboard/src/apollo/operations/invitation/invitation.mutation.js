import { gql } from '@apollo/client';

export const CREATE_INVITATION = gql`
	mutation createIntegration($records: [CreateManyInvitationInput!]!) {
		invitationCreate(records: $records) {
			records {
				_id
				organization
				from
				to
				access
			}
		}
	}
`;
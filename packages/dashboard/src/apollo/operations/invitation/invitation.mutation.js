import { gql } from '@apollo/client';

export const CREATE_INVITATION = gql`
	mutation createInvitation($records: [CreateManyInvitationInput!]!) {
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
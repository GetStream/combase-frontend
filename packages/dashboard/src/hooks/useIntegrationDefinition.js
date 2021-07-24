import { useQuery } from "@apollo/client";
import { GET_INTEGRATION_DEFINITION } from 'apollo/operations/integration';

const useIntegrationDefinition = (id) => {
	return useQuery(GET_INTEGRATION_DEFINITION, { variables: { id } });
};

export default useIntegrationDefinition;
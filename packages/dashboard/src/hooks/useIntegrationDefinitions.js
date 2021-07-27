import { useQuery } from "@apollo/client";
import { GET_INTEGRATION_DEFINITIONS } from 'apollo/operations/integration';

const useIntegrationDefinitions = (filter) => {
	return useQuery(GET_INTEGRATION_DEFINITIONS, { variables: { filter } });
};

export default useIntegrationDefinitions;
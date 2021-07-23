import { useQuery } from "@apollo/client";
import { GET_INTEGRATION_DEFINITIONS } from 'apollo/operations/integration';

const useIntegrationDefinitions = (_id) => {
	return useQuery(GET_INTEGRATION_DEFINITIONS);
};

export default useIntegrationDefinitions;
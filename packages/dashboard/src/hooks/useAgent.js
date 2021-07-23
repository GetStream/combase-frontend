import { useQuery } from "@apollo/client";
import { GET_AGENT } from 'apollo/operations/agent';

const useAgent = (_id) => {
	return useQuery(GET_AGENT, { variables: { _id } });
};

export default useAgent;
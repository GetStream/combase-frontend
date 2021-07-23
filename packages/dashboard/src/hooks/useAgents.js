import { useQuery } from "@apollo/client";
import { GET_AGENTS } from 'apollo/operations/agent';

const defaultFilter = {OR:[{archived:null}, {archived:false}]};
const queryOpts = {
	fetchPolicy: 'cache-and-network', 
	variables: {
		filter: defaultFilter,
	}
};

const useAgents = () => {
	return useQuery(GET_AGENTS, queryOpts);
};

export default useAgents;
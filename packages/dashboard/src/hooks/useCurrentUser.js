import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from 'apollo/operations/auth';

const queryOpts = { fetchPolicy: 'cache-and-network' };

const useCurrentUser = () => {
	return useQuery(GET_CURRENT_USER, queryOpts);
};

export default useCurrentUser;
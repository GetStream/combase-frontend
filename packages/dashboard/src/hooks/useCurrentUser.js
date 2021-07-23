import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from 'apollo/operations/auth';

const useCurrentUser = () => {
	return useQuery(GET_CURRENT_USER);
};

export default useCurrentUser;
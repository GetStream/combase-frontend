import { useQuery } from "@apollo/client";
import { GET_USER } from 'apollo/operations/user';

const useUser = (_id) => {
	return useQuery(GET_USER, { fetchPolicy: "cache-and-network", variables: { _id } });
};

export default useUser;
import { useQuery } from "@apollo/client";
import { GET_TICKET } from 'apollo/operations/ticket';

const useTicket = (_id) => {
	return useQuery(GET_TICKET, { fetchPolicy: 'cache-and-network', variables: { _id } });
};

export default useTicket;
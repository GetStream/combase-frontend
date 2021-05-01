import { useQuery } from '@combase.app/apollo';

const defaultOpts = { fetchPolicy: 'cache-and-network' };

export const useEntities = (query, queryOpts = defaultOpts) => {
    const { data, error, loading } = useQuery(query, queryOpts);

    const entities = data?.organization?.entities;
    const organization = data?.organization?._id;
    const me = data?.me;

    return [
        entities,
        {
			organization,
			me,
            error,
            loading,
        },
    ];
};

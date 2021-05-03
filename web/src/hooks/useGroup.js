import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, GET_GROUP } from '@combase.app/apollo';

const useGroup = groupIdProp => {
    const params = useParams();
    const groupId = params?.groupId || groupIdProp;

    const queryOpts = useMemo(
        () => ({
            fetchPolicy: 'cache-and-network',
            variables: { _id: groupId },
        }),
        [groupId]
    );

    const { data, loading, error } = useQuery(GET_GROUP, queryOpts);
    const group = data?.organization?.group;

    return [
        group,
        {
            error,
            loading,
        },
    ];
};

export default useGroup;

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, GET_INTEGRATION_DEFINITION } from '@combase.app/apollo';

const useIntegrationDefinition = integrationIdProp => {
    const params = useParams();
    const integrationId = params?.integrationId || integrationIdProp;

    const queryOpts = useMemo(
        () => ({
            fetchPolicy: 'cache-and-network',
            variables: { id: integrationId },
        }),
        [integrationId]
    );

    const { data, loading, error } = useQuery(GET_INTEGRATION_DEFINITION, queryOpts);
    const integrationDefinition = data?.integrationDefinition;

    return [
        integrationDefinition,
        {
            error,
            loading,
        },
    ];
};

export default useIntegrationDefinition;

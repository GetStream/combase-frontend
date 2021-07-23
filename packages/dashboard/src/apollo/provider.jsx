import React, { useCallback, useState } from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import { useEffectOnce } from 'react-use';

import createApolloClient from './createClient';

export const ApolloProvider = ({ endpoint, children }) => {
    const [apolloClient, setApolloClient] = useState();

    const init = useCallback(async () => {
        try {
            const c = await createApolloClient(endpoint);
            setApolloClient(c);
        } catch (error) {
            console.error('Client creation failed.');
        }
    }, []);

    useEffectOnce(() => {
        init();
    });

    if (!apolloClient) {
        return null;
    }

    return <Provider client={apolloClient}>{children}</Provider>;
};

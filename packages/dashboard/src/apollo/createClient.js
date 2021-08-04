import { ApolloClient, ApolloLink, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import SerializingLink from 'apollo-link-serialize';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import QueueLink from 'apollo-link-queue';

import { cache } from './cache';
import { authenticationVar } from './variables';

let client = null;

export default async endpoint => {
    if (client) {
        return client;
    }

	
    await persistCache({
		cache,
        storage: new LocalStorageWrapper(window.localStorage),
    });
	
    const queueLink = new QueueLink();
    const retryLink = new RetryLink();
    const serializingLink = new SerializingLink();

    const httpLink = new HttpLink({
        uri: `http${import.meta.env.VITE_APP_SSL ? 's' : ''}://${endpoint}`,
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        const orgId = localStorage.getItem('combase-organization');

		let additional = {};

		if (orgId) {
			additional = {
				'combase-organization': orgId,
			}
		}
		console.log('req: Authorization', token, authenticationVar())
        return {
            headers: {
                ...headers,
				...additional,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const wsLink = new WebSocketLink({
        options: {
            connectionParams: {
                Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
            },
            reconnect: true,
        },
        uri: `ws${import.meta.env.VITE_APP_SSL ? 's' : ''}://${endpoint}`,
    });

    /*
     * The split function takes three parameters:
     * * A function that's called for each operation to execute
     * * The Link to use for an operation if the function returns a "truthy" value
     * * The Link to use for an operation if the function returns a "falsy" value
     */
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);

            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink
    );

    client = new ApolloClient({
        cache,
        connectToDevTools: true,
        link: ApolloLink.from([queueLink, serializingLink, retryLink, authLink, splitLink]),
    });

    return client;
};

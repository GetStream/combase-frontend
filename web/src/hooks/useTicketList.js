import { useCallback, useEffect, useMemo } from 'react';
import { GET_CONVERSATIONS, NEW_TICKET_FRAGMENT, UNREAD_COUNT_FRAGMENT, useQuery } from '@combase.app/apollo';
import { useHistory, useParams } from 'react-router-dom';
import { useChatClient } from '@combase.app/chat';
import { useAsyncFn } from 'react-use';

import { channelToTicketEdge } from 'contexts/TicketManager/utils';

/**
 * 1. Query stream chat and create partial tickets in the cache, with the _id, the local only fields for lastMessage etc. Each list item can then query for its own data, and if they do require any other data not present in the cache, its handled internally.
 * 2. Listen to new events and update the cache.
 *
 * This should give us a list of Ticket's - queried, sorted, filtered etc. by the Chat Client - but presented (and enriched) as/with our Mongo data.
 */

export const useTicketList = (filter, sort, opts) => {
    const history = useHistory();
    const { inbox } = useParams();

    const chatClient = useChatClient();

    const queryOpts = useMemo(
        () => ({
            variables: {
                filter,
            },
			fetchPolicy: 'cache-only',
        }),
        [filter]
    );

    const { data, client: apollo } = useQuery(GET_CONVERSATIONS, queryOpts);
    const count = data?.entities?.count;

    const queryChannels = useCallback(
        async reload => {
            try {
                const channels = await chatClient.queryChannels(queryOpts.variables.filter, sort, {
                    ...opts,
                    limit: opts?.limit ?? 10,
                    offset: reload ? 0 : count,
                });
                const edges = channels.map(channelToTicketEdge);
                const overwrite = reload || count === 0;

                if (overwrite) {
                    apollo.cache.writeQuery({
                        query: GET_CONVERSATIONS,
                        variables: queryOpts.variables,
                        data: {
                            entities: {
                                edges,
                                count: edges.length,
                                hasMore: Boolean(edges?.length),
                                __typename: 'TicketConnection',
                            },
                        },
                    });
                } else {
                    apollo.cache.modify({
                        fields: {
                            tickets(existing) {
                                const cachedEdges = edges.map(edge => ({
                                    ...edge,
                                    node: apollo.cache.writeFragment({
                                        fragment: NEW_TICKET_FRAGMENT,
                                        data: edge.node,
                                    }),
                                }));

                                const newEdges = [...existing.edges, ...cachedEdges];
                                return {
                                    ...existing,
                                    edges: newEdges,
                                    count: newEdges?.length,
                                    hasMore: Boolean(edges?.length),
                                };
                            },
                        },
                    });
                }

                return edges;
            } catch (error) {
                console.info(error.message);
            }
        },
        [apollo, chatClient, count, queryOpts, sort, opts]
    );

    const [{ error, loading }, loadMore] = useAsyncFn(queryChannels, [queryChannels]);

    useEffect(() => {
        loadMore(true);
    }, [loadMore, queryOpts]);

    const onClickTicket = useCallback(
        ticketId => {
            if (ticketId) {
                apollo.cache.writeFragment({
                    id: apollo.cache.identify({ id: ticketId, __typename: 'Ticket' }),
                    fragment: UNREAD_COUNT_FRAGMENT,
                    data: {
                        unread: 0,
                    },
                });

                history.push(`/dashboard/conversations/${inbox}/${ticketId}`);
            }
        },
        [apollo.cache, history, inbox]
    );

    return [data?.entities, { error, loading, onClickTicket, loadMore }];
};

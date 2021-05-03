import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@combase.app/apollo';
import update from 'immutability-helper';

/** Runs on every incoming subscription to merge the new activities with the cache.  */
const handleSubscription = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) return prev;

    const { activities } = subscriptionData.data;

    if (activities?.new?.length) {
        return update(prev, {
            flatFeed: {
                activities: {
                    $unshift: activities.new,
                },
            },
        });
    }

    return [];
};

export const useFlatFeed = (feed, QUERY, SUBSCRIPTION) => {
    const [hasMore, setHasMore] = useState(true);

    const { data, error, loading, subscribeToMore, fetchMore } = useQuery(QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            feed,
            options: {
                limit: 20,
            },
        },
    });

    useEffect(() => {
        if (!QUERY || !SUBSCRIPTION) {
            throw new Error('Missing QUERY and SUBSCRIPTION arguments.');
        }

        // const unsubscribe = subscribeToMore({
        //     document: SUBSCRIPTION,
        //     updateQuery: handleSubscription,
        //     variables: { feed },
        // });

        // return () => unsubscribe?.();
    }, [feed, SUBSCRIPTION]);

    const loadMore = useCallback(
        async id_lt => {
            if (!hasMore) return;

            try {
                const { data: nextData } = await fetchMore({
                    variables: {
                        feed,
                        options: {
                            id_lt,
                            limit: 20,
                        },
                    },
                });

                const count = nextData?.flatFeed?.activities?.length;

                setHasMore(count === 20);
            } catch (error_) {
                // eslint-disable-next-line no-console
                console.log(error_.message);
            }
        },
        [feed, fetchMore, hasMore]
    );

    return [data?.flatFeed?.activities, loading, error, loadMore];
};

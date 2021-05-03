import { useCallback, useEffect, useReducer, useState } from 'react';
import uniqBy from 'lodash.uniqby';

import { useChatClient } from '../../client';

import { reducer, initialState } from './state';

const initialChannels = [];

export const useChannels = (filters, sort, options) => {
    const client = useChatClient();

    const [state, dispatch] = useReducer(reducer, initialState);
    const { error, hasMore, loading, offset, refreshing } = state;

    const [channels, setChannels] = useState(initialChannels);

    const queryChannels = useCallback(
        async reload => {
            if (refreshing) {
                return;
            }

            if (reload) {
                setChannels(initialChannels);
                dispatch({ type: 'reload' });
            } else {
                dispatch({
                    refreshing: true,
                    type: 'setRefreshing',
                });
            }

            const queryOpts = {
                ...options,
                limit: options?.limit ?? 10,
                offset: reload ? 0 : offset,
            };

            try {
                const newChannels = await client.queryChannels(filters, sort, queryOpts);
                let prevCount;
                let loadingMore;

                setChannels(prev => {
                    prevCount = prev.length;
                    return reload ? [...prev, ...newChannels] : newChannels;
                });

                dispatch({
                    hasMore: newChannels.length >= queryOpts.limit,
                    offset: reload ? prevCount + newChannels.length : newChannels.length,
                    type: 'onSetChannels',
                });
            } catch (error_) {
                console.warn(error_); // eslint-disable-line no-console
                dispatch({
                    error: true,
                    type: 'error',
                });
            }
        },
        [filters, offset, options, refreshing, sort]
    );

    useEffect(() => {
        if (client.userID) {
            queryChannels(true);
        }
    }, [client, filters]);

    const setChannel = useCallback(channel => {
        setChannels(c => uniqBy([channel, ...c], 'cid'));
    }, []);

    const removeChannel = useCallback(channel => {
        setChannels(c => c.filter(({ cid }) => cid !== channel?.cid));
    }, []);

    return [
        channels,
        {
            setAll: setChannels,
            set: setChannel,
            remove: removeChannel,
        },
        {
            hasMore,
            loadMore: queryChannels,
            error,
            loading,
            refreshing,
        },
    ];
};

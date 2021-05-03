export const reducer = (state, action) => {
    switch (action.type) {
        case 'onSetChannels': {
            const { hasMore, offset } = action;

            return {
                ...state,
                hasMore: typeof hasMore !== 'undefined' ? hasMore : state.hasMore,
                loading: false,
                offset: typeof offset !== 'undefined' ? offset : state.offset,
                refreshing: false,
            };
        }

        case 'reload': {
            return {
                ...state,
                error: false,
                loading: true,
                offset: 0,
                refreshing: false,
            };
        }

        case 'error': {
            const { error } = action;

            return {
                ...state,
                error,
                loading: false,
                refreshing: false,
            };
        }

        case 'setLoading': {
            const { loading } = action;

            return {
                ...state,
                loading,
            };
        }

        case 'setRefreshing': {
            const { refreshing } = action;

            return {
                ...state,
                refreshing,
            };
        }

        default:
            return state;
    }
};

export const initialState = {
    error: false,
    hasMore: true,
    loading: true,
    offset: 0,
    refreshing: false,
};

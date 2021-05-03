export const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            const { channel } = action;

            return {
                ...state,
                loading: false,
                members: channel.state.members,
                messages: channel.state.messages,
                read: channel.state.read,
                watcherCount: channel.state.watcher_count,
                watchers: channel.state.watchers,
            };
        }

        case 'copyState': {
            const { channel } = action;

            return {
                ...state,
                members: channel.state.members,
                messages: channel.state.messages,
                read: channel.state.read,
                typing: channel.state.typing,
                watcherCount: channel.state.watcher_count,
                watchers: channel.state.watchers,
            };
        }

        case 'copyMessages': {
            const { channel, parentId } = action;

            return {
                ...state,
                messages: channel.state.messages,
                threadMessages: parentId ? channel.state.threads[parentId] || [] : state.threadMessages,
            };
        }

        case 'error': {
            const { error } = action;

            return {
                ...state,
                error,
            };
        }

        case 'loadMoreFinished': {
            const { hasMore, messages } = action;

            return {
                ...state,
                hasMore,
                loadingMore: false,
                messages,
            };
        }

        case 'setLoadingMore': {
            const { loadingMore } = action;

            return {
                ...state,
                loadingMore,
            };
        }

        default:
            return state;
    }
};

export const initialState = {
    error: null,
    hasMore: true,
    loading: true,
    loadingMore: false,
    members:{},
    messages: [],
    read:{},
    thread: null,
    threadHasMore: true,
    threadLoadingMore: false,
    threadMessages: [],
    typing:{},
    watcherCount: 0,
    watchers:{},
};

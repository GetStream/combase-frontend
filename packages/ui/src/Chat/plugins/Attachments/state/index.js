import update from 'immutability-helper';

export const initialState = {
    attachments: {},
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'upload':
            return update(state, {
                attachments: {
                    $merge: {
                        [action.id]: action.data,
                    },
                },
            });
        case 'complete':
            return update(state, {
                attachments: {
                    [action.id]: {
                        $merge: {
                            state: 'complete',
                            ...action.data,
                        },
                    },
                },
            });
        case 'failed':
            return update(state, {
                attachments: {
                    [action.id]: {
                        $merge: {
                            state: 'failed',
                        },
                    },
                },
            });
        case 'remove':
            return update(state, {
                attachments: {
                    $unset: [action.id],
                },
            });
        default:
            return state;
    }
};

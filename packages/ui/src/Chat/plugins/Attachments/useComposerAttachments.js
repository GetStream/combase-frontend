import { useMemo, useReducer } from 'react';

import withAttachments from './withAttachments';
import { useChannel } from '@combase.app/chat';
import { PLUGIN_ATTACHMENTS } from './defaults';

import { reducer, initialState } from './state';

export const useComposerAttachments = () => {
    const channel = useChannel();
    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        plugin: useMemo(
            () => ({
                pluginKeys: PLUGIN_ATTACHMENTS,
                withOverrides: [withAttachments({ channel, dispatch })],
            }),
            [channel]
        ),
        state,
    };
};

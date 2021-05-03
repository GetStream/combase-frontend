import { useMemo, useCallback } from 'react';

import { useChannel } from '@combase.app/chat';
import { PLUGIN_TYPING_EVENTS } from './defaults';

export const useComposerTypingEvents = () => {
    const channel = useChannel();

    const onKeyDown = useCallback(
        () => async event => {
            if (channel) {
                if (event.key === 'Enter') {
                    await channel.stopTyping();
                } else {
                    await channel.keystroke();
                }
            }
        },
        [channel]
    );

    return {
        plugin: useMemo(
            () => ({
                pluginKeys: PLUGIN_TYPING_EVENTS,
                onKeyDown,
            }),
            [onKeyDown]
        ),
    };
};

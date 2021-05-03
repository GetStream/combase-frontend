import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';

export const useChannelReadCursors = () => {
    const getReadCursors = useCallback(({ read }) => read, []);

    const cursors = useContextSelector(ChannelContext, getReadCursors);

    return cursors;
};

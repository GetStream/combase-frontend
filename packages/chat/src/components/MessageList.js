import React, { useCallback, useRef, useState } from 'react';
import { EmptyView, VirtualizedList } from '@combase.app/ui';

import { useChannelMessages, useIsMounted } from '../hooks';

const listStyle = {
    height: '100%',
    width: '100%',
};

const START_INDEX = 99;

export const MessageList = ({ renderItem }) => {
	const [messages, { loading, loadingMore, loadMore, hasMore }] = useChannelMessages();
    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
	
    const virtuoso = useRef(undefined);
    const mounted = useIsMounted();
    const fetching = useRef(false);

    const itemContent = useCallback(index => renderItem(index - firstItemIndex), [firstItemIndex, renderItem]);

    const prepend = useCallback(async () => {
        if (!hasMore || fetching.current || !mounted.current) {
            return;
		}
		
		fetching.current = true;

		await new Promise((resolve) => {
			setTimeout(async () => {
				await loadMore(messages[0], 100, setFirstItemIndex);
				requestAnimationFrame(resolve);
			}, 500);
		});

        fetching.current = false;
	}, [hasMore, loadMore, messages]);

	if (!messages?.length) return <div />

    return (
		<VirtualizedList
			firstItemIndex={firstItemIndex}
			followOutput="smooth"
			initialTopMostItemIndex={messages?.length - 1}
			itemContent={itemContent}
			loading={hasMore && !messages?.length || loadingMore}
			overscan={25}
			ref={virtuoso}
			startReached={prepend}
			style={listStyle}
			totalCount={messages?.length || 0}
		/>
    );
};

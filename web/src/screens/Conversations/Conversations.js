import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';

import { useReactiveMedia } from 'hooks';

import ConversationsMenu from './ConversationsMenu';

import Conversation from 'screens/Conversation'
import SplitView from 'layouts/SplitView';

const Conversations = () => {
	const isSm = useReactiveMedia('sm');
	const isXl = useReactiveMedia('xl');

	const columnTemplate = useMemo(() => {
		if (isXl?.matches) {
			return `minmax(35%, 35rem) 1fr`;
		}

		if (isSm?.matches) {
			return `minmax(20%, 20rem) 1fr`;
		}

		return '1fr';
	}, [isSm, isXl]);

	return (
		<SplitView columnTemplate={columnTemplate}>
			<ConversationsMenu exact path="/dashboard/conversations/:inbox" />
			<Route path="/dashboard/conversations/:inbox/:channelId" component={Conversation} />
		</SplitView>
	);
}

export default Conversations;
import React, { useMemo } from 'react';

import { useReactiveMedia } from 'hooks';

import ConversationsMenu from './ConversationsMenu';

import Conversation from 'screens/Conversation'
import SplitView from 'layouts/SplitView';
import AssignTicket from 'contexts/AssignTicket';

const Conversations = () => {
	const isSm = useReactiveMedia('sm');

	const columnTemplate = useMemo(() => {
		if (isSm?.matches) {
			return `minmax(25%, 23rem) 1fr`;
		}

		return '1fr';
	}, [isSm]);

	return (
		<AssignTicket>
			<SplitView columnTemplate={columnTemplate}>
				<ConversationsMenu exact path="/dashboard/conversations/:inbox/:channelId?" />
				<Conversation path="/dashboard/conversations/:inbox/:channelId" />
			</SplitView>
		</AssignTicket>
	);
}

export default Conversations;
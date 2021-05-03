import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { Box, SplitView } from '@combase.app/ui';

import { useReactiveMedia } from 'hooks';

import ConversationsMenu from './ConversationsMenu';

const ConversationPanel = styled(Box)`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr ${({ drawer }) => (drawer ? `minmax(20%, 20rem)` : '')};
`;

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
			<Route path="/dashboard/conversations/:inbox/:channelId/:page?">
                {({ match }) => (
                    <ConversationPanel path="/dashboard/conversations/:inbox/:channelId" drawer={match?.params?.page}>
                        {/* <Route component={Conversation} path="/dashboard/conversations/:inbox/:channelId" />
                        <Route component={ConversationDetails} path="/dashboard/conversations/:inbox/:channelId/info" /> */}
                    </ConversationPanel>
                )}
            </Route>
		</SplitView>
	);
}

export default Conversations;
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Card, ScrollbarsWithContext } from '@combase.app/ui';
import { ChannelList, useChatContext } from 'stream-chat-react';

import Header from './Header';
import NewConversation from './NewConversation';
import RecentConversations from './RecentConversations';

const Root = styled(Box)``;

const Widgets = styled(Box)`
	${Card} + ${Card} {
		margin-top: 1rem;
	}
`;

const Home = () => {
	const { client } = useChatContext();

	const { filters, sort } = useMemo(
        () => ({
            filters: {
                type: 'combase',
                members: { $in: [client?.userID] },
            },
            sort: {
                last_message_at: -1,
            },
        }),
        [client]
    );

    return (
        <Root>
            <ScrollbarsWithContext>
                <Header />
				<ChannelList filters={filters} sort={sort} />
                {/* <Widgets paddingX={3} paddingBottom={3}>
                    <NewConversation />
                    <RecentConversations />
                </Widgets> */}
            </ScrollbarsWithContext>
        </Root>
    );
};

export default Home;

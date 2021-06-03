import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, ChannelPreview, EmptyView, InboxIcon, ScrollbarsWithContext, Text } from '@combase.app/ui';
import { ChannelList, useChatContext } from 'stream-chat-react';

import Header from './Header';
import NewConversation from './NewConversation';
import RecentConversations from './RecentConversations';
import WelcomeForm from './WelcomeForm';

import { useAuth } from '../../WidgetConfig';

const Root = styled(Box)``;

const Widgets = styled(Box)`
	& > * + * {
		margin-top: 1rem;
	}
`;

const WidgetChannelPreview = (props) => <ChannelPreview {...props} compact />

const LoadingChannels = () => (
	<>
		<WidgetChannelPreview />
		<WidgetChannelPreview />
		<WidgetChannelPreview />
	</>
);

const EmptyChannels = () => {
    return (
        <EmptyView color="altText" icon={<InboxIcon color="altText" opacity={0.56} size={10} />} minHeight={12} title="No Recent Conversations">
            <Text color="altText" opacity={0.56} fontSize={2} lineHeight={4} marginTop={1}>
                Got a question? <br /> Start a new conversation! 💬
            </Text>
        </EmptyView>
    );
};

const Home = () => {
	const { client } = useChatContext();
	const [auth] = useAuth();

	const { filters, sort, options } = useMemo(
        () => ({
            filters: {
                type: 'combase',
                members: { $in: [client?.userID] },
				$or: [
					{
						status: { $eq: 'open' }
					},
					{
						status: { $eq: 'unassigned' }
					},
					{
						status: { $eq: 'new' }
					},
				]
            },
            sort: {
                last_message_at: -1,
            },
			options: {
				limit: 3,
			}
        }),
        [client]
    );

    return (
        <Root>
            <ScrollbarsWithContext>
                <Header />
				{!auth ? (
					<WelcomeForm />
				) : (
					<Widgets paddingX={3} paddingBottom={3}>
						<NewConversation />
						<ChannelList 
							filters={filters} 
							sort={sort} 
							options={options}
							setActiveChannelOnMount={false} 
							EmptyStateIndicator={EmptyChannels}
							List={RecentConversations} 
							LoadingIndicator={LoadingChannels}
							Paginator={({ children }) => children}
							Preview={WidgetChannelPreview}
						/>
					</Widgets>
				)}
            </ScrollbarsWithContext>
        </Root>
    );
};

export default Home;

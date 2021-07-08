import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Card, CardHeader, ChannelPreview, EmptyView, InboxIcon, ScrollContextProvider, useScrollbars, Text, ConversationsIcon } from '@combase.app/ui';
import { Scrollbars } from 'rc-scrollbars';
import { ChannelList, useChatContext } from 'stream-chat-react';

import Header from './Header';
import NewConversation from './NewConversation';
import RecentConversations from './RecentConversations';
import WelcomeForm from './WelcomeForm';

import { useAuth } from '../../WidgetConfig';

const Root = styled(Box)`
	width: 100%;
	height: 100%;
	perspective: 1;
`;

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

const Paginator = ({ children }) => children;

const scrollStyle = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 10,
}

const Home = () => {
	const { client } = useChatContext();
	const scrollbars = useScrollbars();
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
			<Header />
            <Scrollbars onScrollFrame={scrollbars.onScroll} style={scrollStyle}>
				{!auth ? (
					<Widgets paddingX={3} paddingTop={19} paddingBottom={3}>
						<Card paddingBottom={5} boxShadow={2} variant="border">
						<CardHeader
							icon={<ConversationsIcon color="blue" size={4} />}
							minHeight={9}
							paddingX={[4, 4, 5]}
						>
							Start a conversation
						</CardHeader>
							<WelcomeForm />
						</Card>
					</Widgets>
				) : (
					<Widgets paddingX={3} paddingTop={19} paddingBottom={3}>
						<NewConversation />
						<ChannelList 
							filters={filters} 
							sort={sort} 
							options={options}
							setActiveChannelOnMount={false} 
							EmptyStateIndicator={EmptyChannels}
							List={RecentConversations} 
							LoadingIndicator={LoadingChannels}
							Paginator={Paginator}
							Preview={WidgetChannelPreview}
						/>
					</Widgets>
				)}
            </Scrollbars>
        </Root>
    );
};

export default () => {
	return (
		<ScrollContextProvider type="px">
			<Home />
		</ScrollContextProvider>
	)
};

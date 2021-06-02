import React from 'react';
import {
	Box,
	Card,
	CardHeader,
	ChannelPreview,
	EmptyView,
	ConversationsIcon,
	InboxIcon,
	Text,
} from '@combase.app/ui';

const Header = ({ loading, hasConversations }) => {
    return (
        <CardHeader
            icon={<ConversationsIcon color="blue" size={4} />}
            minHeight={9}
            paddingX={[4, 4, 5]}
            paddingTop={4}
        >
            Conversations
        </CardHeader>
    );
};

const EmptyChannels = ({ loading }) => {
    if (loading) {
        return (
            <>
                <ChannelPreview compact />
                <ChannelPreview compact />
                <ChannelPreview compact />
            </>
        );
    }

    return (
        <EmptyView color="altText" icon={<InboxIcon color="altText" opacity={0.56} size={10} />} minHeight={12} title="No Recent Conversations">
            <Text color="altText" opacity={0.56} fontSize={2} lineHeight={4} marginTop={1}>
                Got a question? <br /> Start a new conversation! 💬
            </Text>
        </EmptyView>
    );
};

const RecentConversations = () => {
    return (
        <Card boxShadow={2}>
            <Header />
            <Box paddingX={[1, 1, 2]} paddingBottom={2}>
				<EmptyChannels loading />
            </Box>
        </Card>
    );
};

export default RecentConversations;

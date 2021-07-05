import React from 'react';
import {
	Box,
	Card,
	CardHeader,
	ConversationsIcon,
} from '@combase.app/ui';

const Header = () => {
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

const RecentConversations = ({ children, loading, LoadingIndicator }) => (
	<Card variant="border" boxShadow={2}>
		<Header />
		<Box paddingX={[1, 1, 2]} paddingBottom={2}>
			{loading ? <LoadingIndicator /> : children}
		</Box>
	</Card>
);

export default RecentConversations;

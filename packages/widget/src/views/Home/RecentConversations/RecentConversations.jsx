import React from 'react';

import Box from '@combase.app/ui/Box';
import Card from '@combase.app/ui/Card';
import CardHeader from '@combase.app/ui/CardHeader';
import {ChatsIcon} from '@combase.app/ui/icons';

const Header = () => {
    return (
        <CardHeader
            icon={<ChatsIcon color="blue" size={4} />}
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

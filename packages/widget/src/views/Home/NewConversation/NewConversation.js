import React from 'react';
import { Link } from 'react-router-dom';
import { useChannelManager } from '@combase.app/chat';
import {
	Box,
	Button,
	Card,
	CardHeader,
	ChannelPreview,
	EmptyView,
	IconButton,
	Spinner,
	AddIcon,
	ChevronRightIcon,
	ConversationsIcon,
	InboxIcon,
	Text,
	Tooltip
} from '@combase.app/ui';
import { InputBase } from '@combase.app/ui/src/Inputs';

import { useCreateTicket } from '../../../WidgetConfig';
import { WidgetChannelPreview } from '../../../WidgetChannelPreview';

const Header = ({ loading, hasConversations }) => {
    const [requestState, createTicket] = useCreateTicket();

    return (
        <CardHeader
            action={
                loading || requestState?.loading ? (
                    <Spinner size={4} />
                ) : undefined
            }
            icon={<AddIcon color="blue" size={4} />}
            minHeight={9}
            paddingX={[4, 4, 5]}
            paddingTop={4}
        >
            Start a conversation
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

const NewConversation = () => {
    const { channels, status } = useChannelManager();

    const hasConversations = channels?.length;
    const isLoading = status.loading || status.refreshing;

    return (
        <Card boxShadow={2}>
            <Header hasConversations={hasConversations} loading={isLoading} />
            <Box paddingX={[1, 1, 2]}>
                <InputBase label="Message" />
            </Box>
        </Card>
    );
};

export default NewConversation;

export const channelToTicketEdge = (channel, i, isNew) => {
    const {
        data: { created_by: user, id, last_message_at, organization, priority, starred, status, updated_at },
        state: { messages },
    } = channel;

    return {
        node: {
            _id: id,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                organization: user.organization,
                __typename: 'User',
            },
            priority: priority || 0,
            starred: starred || false,
            status,
            organization,
            createdAt: updated_at,
            updatedAt: updated_at,
            unread: channel.countUnread() || 0,
            latestMessageAt: last_message_at,
            latestMessage: messages[messages.length - 1]?.text,
            __typename: 'Ticket',
        },
        __typename: 'TicketEdge',
    };
};

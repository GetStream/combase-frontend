export const getMessageGroupStyles = (message, previousMessage, nextMessage, noGroupByUser) => {
    if (message?.type === 'message.date') return '';

    if (message?.type === 'channel.event') return '';

    if (message?.type === 'channel.intro') return '';

    if (noGroupByUser) return 'single';

    const isTopMessage =
        !previousMessage ||
        previousMessage.type === 'channel.intro' ||
        previousMessage.type === 'message.date' ||
        previousMessage.type === 'system' ||
        previousMessage.display === 'system' ||
        previousMessage.type === 'channel.event' ||
        previousMessage.attachments.length !== 0 ||
        message?.user.id !== previousMessage.user.id ||
        previousMessage.type === 'error' ||
        previousMessage.deleted_at;

    const isBottomMessage =
        !nextMessage ||
        nextMessage.type === 'message.date' ||
        nextMessage.type === 'system' ||
        nextMessage.type === 'channel.event' ||
        nextMessage.type === 'channel.intro' ||
        nextMessage.attachments.length !== 0 ||
        message?.user.id !== nextMessage.user.id ||
        nextMessage.type === 'error' ||
        nextMessage.deleted_at;

    if (!isTopMessage && !isBottomMessage) {
        if (message?.deleted_at || message?.type === 'error') return 'single';

        return 'middle';
    }

    if (isBottomMessage) {
        if (isTopMessage || message?.deleted_at || message?.type === 'error') return 'single';

        return 'bottom';
    }

    if (isTopMessage) return 'top';

    return '';
};

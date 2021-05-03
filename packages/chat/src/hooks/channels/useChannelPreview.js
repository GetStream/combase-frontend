import { useState, useEffect } from 'react';

export const useChannelPreview = (channel, active) => {
    const [unread, setUnread] = useState(0);
    const [latestMessage, setLatestMessage] = useState(channel?.state?.messages?.[channel?.state?.messages?.length - 1]);

    useEffect(() => {
        setUnread(channel?.countUnread?.() || 0);
    }, [channel]);

    useEffect(() => {
        const handleEvent = e => {
            setLatestMessage(e.message);

            if (!active) {
                setUnread(e.unread_count || 0);
            } else {
                setUnread(0);
            }
        };

        let listening;

        if (channel && channel?.on) {
            listening = true;
        }

        if (listening) {
            channel.on('message.new', handleEvent);
            channel.on('message.updated', handleEvent);
            channel.on('message.deleted', handleEvent);
            channel.on('notification.message_new', handleEvent);
        }

        return () => {
            if (listening) {
                channel.off('message.new', handleEvent);
                channel.off('message.updated', handleEvent);
                channel.off('message.deleted', handleEvent);
                channel.off('notification.message_new', handleEvent);
            }
        };
    }, [active, channel]);

    useEffect(() => {
        if (active) {
            setUnread(0);
        } else {
            setUnread(channel?.countUnread?.() || 0);
        }
    }, [active, channel]);

    return [unread, latestMessage];
};

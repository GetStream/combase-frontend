import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { getMessagePreview, useChannelPartner, useChannelPreview } from '@combase.app/chat';
import { ChannelPreview } from '@combase.app/ui';

export const WidgetChannelPreview = ({ compact, channel, selectable, ...rest }) => {
    const partner = useChannelPartner(channel?.state?.members);
    const [unread, latestMessage] = useChannelPreview(channel, false);

    const history = useHistory();
    const goToChannel = useCallback(() => (channel?.id ? history.push(`/c/${channel.id}`) : null), [channel, history]);

    const message = useMemo(() => {
        if (partner?.user) {
            return getMessagePreview(latestMessage);
        }

        if (channel?.cid) {
            return 'Finding you an agent...';
        }

        return null;
    }, [channel, latestMessage, partner]);

    return (
        <ChannelPreview
            compact={compact}
            message={message}
            onClick={selectable ? () => rest?.onSelect?.(channel.id) : goToChannel}
            selectable={selectable}
            unread={unread > 0}
            updatedAt={latestMessage?.updated_at}
            partnerAvatar={partner?.user?.avatar}
            partnerName={partner?.user?.name}
            value={channel.id}
            {...rest}
        />
    );
};

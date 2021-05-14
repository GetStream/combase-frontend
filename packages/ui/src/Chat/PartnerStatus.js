import { useMemo } from 'react';
import { useUserTypingIndicator } from '@combase.app/chat';
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Badge } from '../Feedback';
import IconLabel from '../IconLabel';
import Tooltip from '../Tooltip';
import Text from '../Text';

export const PartnerStatus = ({ lastActive, user }) => {
    const isTyping = useUserTypingIndicator(user?.id);

    const subtext = useMemo(() => {
        if (isTyping) {
            return 'is typing...';
        }

        if (user?.online) {
            return 'online';
        }

        if (!user?.online) {
            return 'offline';
        }

        return 'Finding you an agent...';
    }, [isTyping, user]);

    return (
        <Tooltip text={lastActive ? `Last seen ${formatDistanceToNow(parseISO(lastActive))} ago` : null}>
            <IconLabel>
                {!isTyping ? <Badge color={user?.online ? 'green' : 'border'} /> : null}
                <Text color="altText" fontWeight="400" fontSize={2} lineHeight={2}>
                    {subtext}
                </Text>
            </IconLabel>
        </Tooltip>
    );
};

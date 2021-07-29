import React, { useMemo } from 'react';
import { useTypingContext } from 'stream-chat-react';
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {BadgeIcon as Badge} from '../icons';
import IconLabel from '../IconLabel';
import Tooltip from '../Tooltip';
import Text from '../Text';

const PartnerStatus = ({ lastActive, showBadge, user }) => {
	const {typing} = useTypingContext();
	const isTyping = typing[user?.id];

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
                {!isTyping && showBadge ? <Badge color={user?.online ? 'green' : 'border'} /> : null}
                <Text color="altText" fontWeight="400" fontSize={2} lineHeight={2}>
                    {subtext}
                </Text>
            </IconLabel>
        </Tooltip>
    );
};

PartnerStatus.defaultProps = {
	showBadge: true,
}

export default PartnerStatus;
import { useContextSelector } from 'use-context-selector';

import { ChannelContext } from '../../contexts/channel/context';
import { getMessageGroupStyles } from '../../utils/getMessageGroupStyles';

export const useMessage = index => {
    const [message, previousMessage, nextMessage] = useContextSelector(
        ChannelContext,
        ({messages}) => [messages[index], messages[index - 1], messages[index + 1]],
        [index]
	);
	
    const grouping = getMessageGroupStyles(message, previousMessage, nextMessage);

    return [message, grouping];
};

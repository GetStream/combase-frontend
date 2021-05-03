import { useEffect } from 'react';

import { useChannel } from '../channel';

export const useChannelEvent = (event, handler) => {
    const channel = useChannel();

    useEffect(() => {
		let listening = false;

		if (channel) {
			listening = true;

			if (!handler) {
				channel.on(event);
			} else {
				channel.on(event, handler);
			}
		}

        return () => {
            if (listening) {
				if (!handler) {
					channel.off(event);
				} else {
					channel.off(event, handler);
				}
			}
        };
    }, [channel, event, handler]);
};

import {useCallback, useState} from 'react';

import {useClientEvent} from '../events/useClientEvent';

export const useConnectionStatus = () => {
    const [online, setOnline] = useState(null);

    const handler = useCallback((e) => setOnline(e.online), []);

    useClientEvent('connection.changed', handler);

    return online;
};

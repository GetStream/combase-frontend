import { useMemo } from 'react';

import FeedsContext from './context';

const FeedsProvider = ({ children, client }) => {
    const value = useMemo(
        () => ({
            client,
        }),
        [client]
    );

    return <FeedsContext.Provider value={value}>{children}</FeedsContext.Provider>;
};

export default FeedsProvider;

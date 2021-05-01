import { useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useHistory, useLocation } from 'react-router-dom';

export const usePreservedLocation = () => {
    const history = useHistory();
    const location = useLocation();

    const prevLocation = useRef();
    const [forceLocation, setForceLocation] = useState();

    useEffectOnce(() => {
        prevLocation.current = location;
    });

    useEffect(() => {
        if (location.pathname !== prevLocation.current?.pathname && history.action !== 'POP') {
            if (!location.state?.preserve) {
                if (forceLocation) {
                    setForceLocation(null);
                }
                prevLocation.current = location;
            } else {
                setForceLocation(prevLocation.current);
            }
        }
    }, [location]);

    return forceLocation;
};

import { useRef } from 'react';

const useSharedRef = (initialValue, refsToShare) => {
    // actual ref that will hold the value
    const innerRef = useRef(initialValue);

    // ref function that will update innerRef value as well as will publish value to all provided refs
    const sharingRef = value => {
        // update inner value
        innerRef.current = value;

        // for each provided ref - update it as well
        refsToShare.forEach(resolvableRef => {
            // react supports various types of refs
            if (typeof resolvableRef === 'function') {
                // if it's functional ref - call it with new value
                resolvableRef(value);
            } else if (resolvableRef) {
                /*
                 * it should be ref with .current prop
                 * make sure it exists - if so - assign new value
                 */
                // eslint-disable-next-line no-param-reassign
                resolvableRef.current = value;
            }
        });
    };

    /**
     * We want ref we return to work using .current, but it has to be function in order
     * to share value with other refs.
     *
     * Let's add custom get property called 'current' that will return
     * fresh value of innerRef.current
     */
    if (!sharingRef.current) {
        Object.defineProperty(sharingRef, 'current', {
            get() {
                return innerRef.current;
            },
        });
    }

    return sharingRef;
};

export default useSharedRef;
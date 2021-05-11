import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffectOnce, usePrevious, useUpdate } from 'react-use';

const Portal = ({ children, disabled, onRendered, unmount }) => {
    const forceUpdate = useUpdate();
    const wasDisabled = usePrevious(disabled);

    useEffectOnce(() => {
        if (!disabled) {
            forceUpdate();
        }
    });

    useEffect(() => {
        if (wasDisabled !== disabled) {
            if (!disabled) {
                forceUpdate();

                if (onRendered) {
                    onRendered();
                }
            }
        }
    }, [disabled, forceUpdate, onRendered, wasDisabled]);

    if (unmount) {
        return null;
    }

    if (disabled) {
        return children;
    }

    return createPortal(children, document?.body);
};

Portal.propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    disabled: PropTypes.bool,
    onRendered: PropTypes.func,
    unmount: PropTypes.bool,
};

Portal.defaultProps = {
    disabled: false,
};

export default Portal;
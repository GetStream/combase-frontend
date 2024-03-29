import React, { createElement, useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { useTransition } from 'react-spring';
import { useClickAway } from 'react-use';
import { zIndex } from '@combase.app/styles';

import Box from '../Box';
import Portal from '../Portal';

const springConfig = {
    friction: 50,
    mass: 1,
    tension: 800,
};

const transitionConfig = {
    config: springConfig,
    enter: { value: 1 },
    from: { value: 0 },
    leave: { value: 0 },
	extrapolateLeft: 'CLAMP'
};

const Presentation = styled(Box)`
	${zIndex};
    position: fixed;
    inset: 0px;
    pointer-events: none;
`;

const Popover = ({ anchor, as, disablePortal, modifiers, open, placement: placementProp, onClose, ...rest }) => {
    const [placement, setPlacement] = useState(placementProp);
    const [popperElement, setPopperElement] = useState(null);

    const popperOptions = useMemo(
        () => ({
            placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, -(anchor?.clientHeight + 16 || 0)],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altBoundary: true,
                    },
                },
                {
                    name: 'flip',
                    options: {
                        altBoundary: true,
                    },
                },
                {
                    name: 'onUpdate',
                    enabled: true,
                    phase: 'afterWrite',
                    fn: ({ state }) => {
                        setPlacement(state.placement);
                    },
                },
                ...modifiers,
            ],
        }),
        [anchor, disablePortal, modifiers, placement]
    );

    const popper = usePopper(anchor, popperElement, popperOptions);
    const transition = useTransition(open, transitionConfig);

    useClickAway({ current: popperElement }, e => {
        if (anchor?.contains?.(e.target)) {
            return;
        }

        onClose();
    });

    return transition(({ value }, mount) => (
        <Portal disabled unmount={!mount}>
            <Presentation zIndex={11}>
                {createElement(as, {
                    animatedValue: value,
                    mount,
                    onClose,
                    popper,
                    placement,
                    ref: setPopperElement,
                    ...rest,
                })}
            </Presentation>
        </Portal>
    ));
};

Popover.propTypes = {
    anchor: PropTypes.object,
    children: PropTypes.node,
    onClose: PropTypes.func,
    modifiers: PropTypes.array,
    options: PropTypes.object,
};

Popover.defaultProps = {
    modifiers: [],
	placement: 'bottom'
};

export default Popover;
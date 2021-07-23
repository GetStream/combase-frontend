import React, { Children, cloneElement, createElement, forwardRef, useCallback, useState } from 'react';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { usePreviousDistinct } from 'react-use';

import Box from '../Box';
import { DropdownIcon } from '../icons';

const Root = styled(Box).attrs({ as: animated.ul })`
    list-style: none;
    will-change: height;
    overflow: hidden;
`;

const Sublist = forwardRef(({ innerStyle, style, ...props }, ref) => (
    <animated.li style={style}>
        <List {...props} ref={ref} style={innerStyle} />
    </animated.li>
));

const List = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const previous = usePreviousDistinct(open);
    const [sublistRef, bounds] = useMeasure({ polyfill: ResizeObserver });

    const { height, rotation } = useSpring({
        config: {
            friction: 40,
            mass: 0.1,
            tension: 720,
        },
        from: {
            rotation: 0,
            height: 0,
        },
        to: {
            rotation: open ? 180 : 0,
            height: open ? bounds.height : 0,
        },
    });

    const enhanceMenuItem = useCallback(child => {
        if (child?.props?.children?.length) {
            const sublist = createElement(Sublist, {
                as: animated.ul,
                children: child.props.children,
                ref: sublistRef,
                style: {
                    height: open && previous === open ? 'auto' : height,
                    overflow: 'hidden',
                    willChange: 'height',
                },
            });

            const listItemStyle = {
                display: 'inline-flex',
                transform: rotation.to(v => `rotate(${v}deg)`),
                transformOrigin: 'center',
            };

            const listItem = cloneElement(child, {
                actions: [
                    <animated.div key={0} style={listItemStyle}>
                        <DropdownIcon color="altText" size={3} />
                    </animated.div>,
                ],
                onClick: () => setOpen(prev => !prev),
                sublist,
            });

            return (
                <>
                    {listItem}
                    {sublist}
                </>
            );
        }

        return child ? cloneElement(child) : child;
    }, []);

    return (
        <Root {...props} ref={ref} role="menu">
            {Children.map(props.children, enhanceMenuItem)}
        </Root>
    );
});

export default List;

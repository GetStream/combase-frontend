import React, { Children, cloneElement, forwardRef } from 'react';
import { useTheme } from 'styled-components';
import { useClickAway, useMedia } from 'react-use';
import { animated } from 'react-spring';

import Box from '../Box';
import Popover, { getTransformOrigin, usePopoverState } from '../Popover';
import Text from '../Text';

const modifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 4],
        },
    },
];

const TooltipChip = forwardRef(({ animatedValue, mount, text, onClose, placement, popper }, ref) => {
    useClickAway(ref, () => onClose?.());

    const style = {
        opacity: animatedValue,
        transform: animatedValue
            .to({
                output: [0.9, 1],
                range: [0, 1],
            })
            .to(v => `scale(${v})`),
        transformOrigin: getTransformOrigin(placement),
    };

    return mount ? (
        <Box ref={ref} style={popper.styles.popper} {...popper.attributes.popper}>
            <Box as={animated.div} backgroundColor="text" borderRadius={1} paddingX={2} paddingY={1} style={style}>
                <Text color="surface" fontSize={2}>
                    {text}
                </Text>
            </Box>
        </Box>
    ) : null;
});

const Tooltip = ({ children, text, placement }) => {
    const [anchorRef, { open, toggle }] = usePopoverState();
    const theme = useTheme();
    const enabled = useMedia(`(min-width: ${theme.breakpoints[1]})`);

	
    if (!text || !enabled) return children;
	
    const child = cloneElement(Children.only(children), {
		ref: anchorRef,
        onMouseEnter: () => toggle(true),
        onMouseLeave: () => toggle(false),
    });

	return (
        <>
            {child}
            <Popover
                anchor={anchorRef.current}
                as={TooltipChip}
				open={open}
                text={text}
                placement={placement}
                modifiers={modifiers}
                onClose={() => toggle(false)}
            />
        </>
    );
};

Tooltip.defaultProps = {
    placement: 'bottom',
};

export default Tooltip;
import { Children, cloneElement, forwardRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { useClickAway, useMedia, useToggle } from 'react-use';
import { animated } from 'react-spring';

import Text from '../../Text';
import Box from '../../Box';

import { Popover } from '../Popover';

import { getTransformOrigin } from '../utils';

const modifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 4],
        },
    },
];

export const TooltipChip = forwardRef(({ animatedValue, mount, text, onClose, placement, popper }, ref) => {
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

export const Tooltip = ({ children, text, placement }) => {
    const [anchorRef, setAnchorRef] = useState();
    const [open, toggle] = useToggle();
    const theme = useTheme();
    const enabled = useMedia(`(min-width: ${theme.breakpoints[1]})`);

	
    if (!text || !enabled) return children;
	
    const child = cloneElement(Children.only(children), {
		ref: setAnchorRef,
        onMouseEnter: () => toggle(true),
        onMouseLeave: () => toggle(false),
    });

	return (
        <>
            {child}
            <Popover
                anchor={open ? anchorRef : undefined}
                as={TooltipChip}
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

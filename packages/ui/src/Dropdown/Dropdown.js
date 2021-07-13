import React, { forwardRef } from 'react';
import { animated } from 'react-spring';

import Box from '../Box';
import Menu from '../Menu';

import { getTransformOrigin } from '../Popover';

const Dropdown = forwardRef(
    ({ animatedValue, children, footer, gutters, header, maxWidth, minWidth, maxHeight, subheading, placement, popper }, ref) => {
        const style = {
            opacity: animatedValue,
            transform: animatedValue
                .to({
                    output: [0.9, 1],
                    range: [0, 1],
                })
                .to(v => `${placement === 'top' || placement === 'bottom' ? 'scaleY' : 'scale'}(${v})`),
            transformOrigin: getTransformOrigin(placement),
        };

        return (
            <Box ref={ref} style={popper.styles.popper} {...popper.attributes.popper}>
                <Menu
                    as={animated.div}
                    backgroundColor="surface"
                    borderRadius={3}
                    boxShadow={7}
                    header={header}
                    footer={footer}
                    maxHeight={maxHeight}
                    minWidth={minWidth || [15, 15, 16]}
                    maxWidth={maxWidth || 18}
                    paddingTop={subheading ? 2 : 0}
                    paddingX={gutters ? 2 : 0}
                    style={style}
                    subheading={subheading}
                >
                    {children}
                </Menu>
            </Box>
        );
    }
);

Dropdown.defaultProps = {
    gutters: true,
};

export default Dropdown;
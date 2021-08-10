import React, { forwardRef } from 'react';
import { animated } from 'react-spring';

import Box from '../Box';
import Card from '../Card';
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
                <Card as={animated.div} borderRadius={3} style={style} variant="border" boxShadow={7}>
					<Menu
						header={header}
						footer={footer}
						maxHeight={maxHeight}
						width="100%"
						minWidth={minWidth || [15, 15, 16]}
						maxWidth={maxWidth}
						paddingTop={subheading ? 2 : 0}
						paddingX={gutters ? 2 : 0}
						subheading={subheading}
					>
						{children}
					</Menu>
				</Card>
            </Box>
        );
    }
);

Dropdown.defaultProps = {
    gutters: true,
};

export default Dropdown;
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import Box from '../Box';

const Root = styled(Box)`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
`;

const Active = styled(animated.div)`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    height: 3px;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
`;

const springConfig = {
    config: {
        friction: 40,
        mass: 1,
        tension: 500,
    },
    from: { dims: [8, 0] },
    to: { dims: [0, 0] },
};

const Tabs = ({ children, onChange, value }) => {
    const [{ dims }] = useSpring(springConfig, []);

    const activeStyle = useMemo(
        () => ({
            transform: dims.to((_, x) => `translate3d(${x}px, 0, 0)`),
            width: dims.to(width => `${width}px`),
        }),
        [dims]
    );

    const tabs = useMemo(() => {
        return React.Children.map(children, (child, index) => {
            const { value: optionValue } = child.props;

            return React.cloneElement(child, {
                active: optionValue === value,
                index,
                onClick: onChange,
				dims,
            });
        });
    }, [children, onChange, value]);

    return (
        <Root paddingBottom={2}>
            {tabs}
            <Active style={activeStyle} />
        </Root>
    );
};

Tabs.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Tabs;
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorAlpha, shadow, layout, wrapperBorderRadius } from '@combase.app/styles';
import { animated, useSpring } from 'react-spring';

import { Box } from '../Layout';

const Root = styled(Box)`
    ${layout};
    ${wrapperBorderRadius};
	${colorAlpha};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 0;
`;

const Active = styled(Box).attrs({ as: animated.div })`
    ${shadow.boxShadow};
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: calc(100% / ${({ optionCount }) => optionCount});
`;

const ToggleGroup = ({ children, onChange, value }) => {
    const [{ x }] = useSpring({
		config: {
			friction: 40,
			mass: 0.1,
			tension: 800,
		},
		from: { x: '0%' },
		to: { x: '0%' },
	}, []);

    const reportActive = useCallback(i => x.start({ to: `${100 * i}%` }), [x]);

    const options = useMemo(() => {
        return React.Children.map(children, (child, index) => {
            const { value: optionValue } = child.props;

            return React.cloneElement(child, {
                active: optionValue === value,
                index,
                onClick: onChange,
                reportActive,
            });
        });
    }, [children, reportActive, onChange, value]);

    return (
        <Root backgroundColor="text" backgroundColorAlpha={0.04} borderRadius={2} minHeight={8}>
            {children?.length ? (
                <Active backgroundColor="white" borderRadius={2} boxShadow={3} optionCount={children?.length || 0} style={{ x }} />
            ) : null}
            {options}
        </Root>
    );
};

ToggleGroup.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ToggleGroup.defaultProps = {
    children: [],
};

export default ToggleGroup;
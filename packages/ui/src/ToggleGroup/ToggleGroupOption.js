import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from '@combase.app/styles';

import { Text } from '../Text';

const Root = styled(Text)`
    ${space};
    flex: 1;
    height: 100%;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    opacity: ${({ active }) => (active ? 1 : 0.48)};
`;

const ToggleGroupOption = ({ active, children, index, onClick, reportActive, value }) => {
    useEffect(() => {
        if (active) {
            reportActive(index);
        }
    }, [active, index, reportActive]);

    const handleClick = useCallback(() => onClick?.(value), [onClick, value]);

    return (
        <Root color={active ? 'slate' : 'text'} active={active} fontWeight="500" margin={0} onClick={handleClick} paddingX={3} variant="label">
            {children}
        </Root>
    );
};

ToggleGroupOption.propTypes = {
    /**
     * @desc Provided by the ToggleGroup parent component
     */
    active: PropTypes.bool,
    children: PropTypes.any,
    /**
     * @desc Provided by the ToggleGroup parent component
     */
    index: PropTypes.number,
    /**
     * @desc Provided by the ToggleGroup parent component
     */
    onClick: PropTypes.func,
    /**
     * @desc Provided by the ToggleGroup parent component
     */
    reportActive: PropTypes.func,
    /**
     * @desc The value of this Option (used to track the 'active' state)
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ToggleGroupOption;
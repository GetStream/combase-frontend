import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from '@combase.app/styles';

import { ButtonBase } from '../Buttons/shared';
import { IconLabel } from '../IconLabel';
import { Text } from '../Text';

const Root = styled(ButtonBase)`
    ${space};
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    position: relative;

    &:active {
        &:before {
            transform: scale(${({ disabled }) => (disabled ? 0 : 0.9)});
        }
    }

    &:before {
        top: -37.5%;
        left: -0.75rem;
        height: 175% !important;
        width: calc(100% + 1.5rem);
        border-radius: ${({ theme }) => theme.borderRadius}rem !important;
    }

    & ${Text} {
        user-select: none;
        pointer-events: none;
        transition: 0.16s opacity ${({ theme }) => theme.ease};
        opacity: 0.48;
    }

    .active& ${Text}, &:hover ${Text} {
        opacity: 1;
    }

    & + & {
        margin-left: 1.5rem;
    }
`;

export const Tab = ({ active, icon, iconSize, reverseLabel, label, onClick, dims, value }) => {
    const ref = useRef();

    useEffect(() => {
        if (active) {
            dims.start({
                to: [ref.current.clientWidth, ref.current.offsetLeft],
            });
        }
    }, [active, dims]);

    return (
        <Root className={active ? 'active' : null} onClick={onClick} paddingX={2} paddingY={3} ref={ref} value={value}>
            <IconLabel reverse={reverseLabel}>
                {icon || null}
                <Text fontSize={3} fontWeight="500" lineHeight={3}>
                    {label}
                </Text>
            </IconLabel>
        </Root>
    );
};

Tab.propTypes = {
    /**
     * @desc Provided by the Tab parent component
     */
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
    /**
     * @desc Provided by the Tab parent component
     */
    onClick: PropTypes.func,
    /**
     * @desc Provided by the Tab parent component
     */
    reportActive: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

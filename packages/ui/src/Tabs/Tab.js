import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorAlpha, layout, space } from '@combase.app/styles';

import { ButtonBase } from '../Buttons/shared';
import { IconLabel } from '../IconLabel';
import { Text } from '../Text';

const Root = styled(ButtonBase)`
    ${space};
	${layout};
	${colorAlpha};
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
	align-items: center;
    position: relative;

    &:before {
		content: '';
		position: absolute;
		background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.text, 0)};
		top: 0;
		left: -0.5rem;
		height: 100%;
        width: calc(100% + 1rem);
        border-radius: ${({ theme }) => theme.radii[1]} !important;
        transition: 0.16s transform ${({ theme }) => theme.ease};
    }

    & ${Text} {
        user-select: none;
        pointer-events: none;
        transition: 0.16s opacity ${({ theme }) => theme.ease};
        opacity: 0.48;
    }

	&:active {
        &:before {
            transform: scale(${({ disabled }) => (disabled ? 0 : 0.95)});
        }
    }

	.active&, &:hover {
		&:before {
			background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.text, 0.04)};
		}
		& ${Text} {
			opacity: 1;
		}
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
        <Root className={active ? 'active' : null} onClick={onClick} maxHeight={7} paddingX={0} paddingY={3} ref={ref} value={value}>
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

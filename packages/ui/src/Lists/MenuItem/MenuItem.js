import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { borderRadius, interactions, itemGap, layout } from '@combase.app/styles';

import { IconLabel } from '../../IconLabel';
import { Box } from '../../Layout';
import { Text } from '../../Text';
import { useCallback } from 'react';

const Root = styled.li`
    list-style: none;
    padding: 0.125rem 0;
`;

const Wrapper = styled(Box)`
    ${borderRadius};
    ${interactions};
    ${layout.minHeight};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 0.5rem;
    user-select: none;
    transition: 240ms background-color ${({ theme }) => theme.ease};

    &,
    & ${IconLabel} {
        cursor: ${({ $active, onClick }) => (onClick && !$active ? 'pointer' : 'default')};
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        ${itemGap};
    }
`;

export const MenuItem = ({
    actions,
    active,
    as,
    className,
    color,
    icon: Icon,
    iconColor,
    iconProps,
    iconSize,
    label,
    onClick,
    value,
    variant,
}) => {
    const handleClick = useCallback(
        e => {
            if (onClick) {
                onClick(value, e);
            }
        },
        [onClick]
    );

    const sm = variant === 'sm';

    return (
        <Root as={as}>
            <Wrapper
                active={active}
                borderRadius={1}
                className={className}
                color="text"
                interaction={onClick ? 'highlight' : undefined}
                minHeight={sm ? 6 : [7, 7, 7, 7, 8]}
                onClick={handleClick}
            >
                <IconLabel iconColor={iconColor || color} color={color} gap={sm ? 2 : [2, 2, 2, 2, 3]} size={iconSize}>
                    {Icon ? <Icon {...iconProps} color={iconColor || color} size={iconSize || sm ? 3 : [3, 3, 3, 3, 4]} /> : null}
                    <Text fontSize={sm ? 3 : [3, 3, 3, 3, 4]} lineHeight={sm ? 3 : [3, 3, 3, 3, 4]}>
                        {label}
                    </Text>
                </IconLabel>
                {actions?.length ? <Actions gapLeft={3}>{actions}</Actions> : null}
            </Wrapper>
        </Root>
    );
};

MenuItem.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node])),
    active: PropTypes.bool,
    as: PropTypes.any,
    color: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

MenuItem.defaultProps = {
    color: 'text',
};

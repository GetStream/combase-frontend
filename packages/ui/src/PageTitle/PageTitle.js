import React from 'react';
import styled from 'styled-components';
import { system } from '@combase.app/styles';
import { animated } from 'react-spring';

import Box from '../Box';
import { Heading, Text, TextGroup } from '../Text';
import { DropdownIcon } from '../icons/index';
import Placeholder from '../Placeholder';

const Root = styled(TextGroup).attrs({
    as: animated.div,
})`
    display: flex;
    flex-direction: ${({ reverse }) => (reverse ? 'column-reverse' : 'column')};

    & p {
        user-select: none;
        pointer-events: none;
    }

    & ${Heading} {
        cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
        position: relative;
        text-transform: capitalize;
        user-select: none;

        & span {
            position: absolute;
            left: 100%;
            top: -2px;
        }
    }
`;

const Spacer = styled(Box)`
    ${system({
        minHeight: {
            property: 'minHeight',
            scale: 'fontSizes',
        },
    })};
`;

const PageTitle = ({ centered, color, reverse, subtitle, marginBottom, onClick, style, title }) => (
    <Root
        variant={centered ? 'centered' : null}
        gapTop={reverse ? 0 : 'small'}
        gapBottom={reverse ? 'small' : 0}
        marginBottom={marginBottom}
        reverse={reverse}
        onClick={onClick}
        style={style}
    >
        {subtitle ? (
            <Text color={color || 'primary'} fontSize={3} lineHeight={3}>
                {subtitle}
            </Text>
        ) : typeof subtitle !== 'undefined' ? (
            <Spacer minHeight={2} />
        ) : null}
        <Heading as={!title ? Placeholder : undefined} fontSize={5} fontWeight={700} lineHeight={5} placeholderWidth={13}>
            {title}
            {onClick ? (
                <span>
                    <DropdownIcon size={5} />
                </span>
            ) : null}
        </Heading>
    </Root>
);

export default PageTitle;
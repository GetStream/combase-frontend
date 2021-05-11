import { forwardRef } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { layout } from '@combase.app/styles';

import IconLabel from '../IconLabel';
import Box from '../Box';
import { Text, TextGroup } from '../Text';

const Root = styled(Box).attrs({
    as: animated.div,
})`
    ${layout.minHeight}
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
`;

const CardHeader = forwardRef(({ action, children, gap, icon, subtext, ...rest }, ref) => (
    <Root {...rest} ref={ref} hasAction={Boolean(action)}>
        <IconLabel gap={gap}>
            {icon || null}
            <TextGroup gapTop={1}>
                <Text color="text" fontSize={3} lineHeight={4} fontWeight={600}>
                    {children}
                </Text>
                {subtext ? (
                    <Text color="altText" fontSize={2} lineHeight={3} fontWeight={600}>
                        {subtext}
                    </Text>
                ) : null}
            </TextGroup>
        </IconLabel>
        {action || null}
    </Root>
));

CardHeader.defaultProps = {
    gap: 3,
    paddingX: 3,
    paddingY: 3,
};

export default CardHeader;
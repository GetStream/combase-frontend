import React from 'react';
import styled from 'styled-components';
import { layout, shadow } from '@combase.app/styles';

import { InfoIcon } from '../icons';
import IconLabel from '../IconLabel';
import Box from '../Box';
import Text from '../Text';
import Tooltip from './Tooltip';

const modifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 4],
        },
    },
];

const Root = styled(Box)`
    ${layout};
    ${shadow.boxShadow};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TooltipExample = () => {
    return (
        <Root borderRadius={2} boxShadow={6} marginX="auto" maxWidth={15} padding={4}>
            <Tooltip
				text="I'm a tooltip!"
            >
				<IconLabel onMouseEnter={(e) => setAnchorRef(e.nativeEvent.target)} onMouseLeave={() => setAnchorRef(false)} reverse>
					<InfoIcon color="orange" />
					<Text>{'Learn More'}</Text>
				</IconLabel>
			</Tooltip>
        </Root>
    );
};

export default {
    component: TooltipExample,
    title: 'Popovers/Tooltip',
};

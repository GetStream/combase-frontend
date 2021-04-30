import React from 'react';
import styled from 'styled-components';
import { layout } from '@combase.app/styles';

import * as allIcons from '../icons';
import { Box } from '../Layout';

import Icon from './Icon';

const icons = Object.values(allIcons);

const Root = styled(Box)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    & ${Box} {
        ${layout};
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            padding-bottom: calc(100% / 1 / 1);
        }
    }
`;

export const Default = () => (
    <Root>
        {icons.map(IconComponent => (
            <Box key={IconComponent.displayName} minHeight={6}>
                <IconComponent color="text" size={4} />
            </Box>
        ))}
    </Root>
);

export default {
    component: Icon,
    title: 'shared/Icon',
};

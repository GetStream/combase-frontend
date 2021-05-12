import React, { useState } from 'react';
import styled from 'styled-components';
import { borderRadius, layout, shadow } from '@combase.app/styles';

import Box from '../Box';
import { GridViewIcon, ListViewIcon } from '../icons';
import { Tooltip } from '../Popovers';
import Text from '../Text';

import ToggleGroup, { ToggleGroupOption } from '.';

const Centered = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

const Root = styled(Box)`
    ${borderRadius};
    ${layout};
    ${shadow.boxShadow};
    flex-shrink: 0;
    max-width: 376px;
    width: 100%;
`;

export const Default = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <Root borderRadius={3} boxShadow={8} padding={4}>
            <ToggleGroup onChange={setActiveTab} value={activeTab}>
                <ToggleGroupOption value="all">{'All'}</ToggleGroupOption>
                <ToggleGroupOption value="open">{'Open'}</ToggleGroupOption>
                <ToggleGroupOption value="closed">{'Closed'}</ToggleGroupOption>
            </ToggleGroup>
        </Root>
    );
};

export const MoreItems = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <Root borderRadius={3} boxShadow={8} padding={4}>
            <ToggleGroup onChange={setActiveTab} value={activeTab}>
                <ToggleGroupOption value="all">{'All'}</ToggleGroupOption>
                <ToggleGroupOption value="open">{'Open'}</ToggleGroupOption>
                <ToggleGroupOption value="closed">{'Closed'}</ToggleGroupOption>
                <ToggleGroupOption value="other">{'Other'}</ToggleGroupOption>
                <ToggleGroupOption value="n/a">{'N/A'}</ToggleGroupOption>
            </ToggleGroup>
        </Root>
    );
};

export const IconToggles = () => {
    const [activeTab, setActiveTab] = useState('a');

    return (
        <Root style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} borderRadius={3} boxShadow={8} padding={4}>
            <Text>List View Mode:</Text>
            <ToggleGroup activeBackgroundColor="white" onChange={setActiveTab} value={activeTab}>
                <ToggleGroupOption value="a">
                    <Tooltip text="List">
                        <div>
                            <ListViewIcon color={activeTab === 'a' ? 'text' : undefined} size={4} />
                        </div>
                    </Tooltip>
                </ToggleGroupOption>

                <ToggleGroupOption value="b">
                    <Tooltip text="Grid">
                        <div>
                            <GridViewIcon color={activeTab === 'b' ? 'text' : undefined} size={4} />
                        </div>
                    </Tooltip>
                </ToggleGroupOption>
            </ToggleGroup>
        </Root>
    );
};

export default {
    component: ToggleGroup,
    decorators: [
        Story => (
            <Centered>
                <Story />
            </Centered>
        ),
    ],
    title: 'shared/ToggleGroup',
};

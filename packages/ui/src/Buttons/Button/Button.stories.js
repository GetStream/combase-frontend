import React from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import Box from '../../Box';
import { CheckIcon, TagIcon } from '../../icons';
import { Text } from '../../Text';

import Button from './Button';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Wrapper = styled(Box)`
    & > * + * {
        ${itemGap};
    }
`;

export const Primary = () => (
    <Grid>
        <Wrapper gapTop={4}>
            <Button>
                <Text variant="label">{'Click Me!'}</Text>
            </Button>
            <Button size="xs">
                <Text variant="label">{'Click Me!'}</Text>
            </Button>
        </Wrapper>
        <Wrapper gapTop={4}>
            <Button variant="flat">
                <Text variant="label">{'Click Me!'}</Text>
            </Button>
            <Button size="xs" variant="flat">
                <Text variant="label">{'Click Me!'}</Text>
            </Button>
        </Wrapper>
    </Grid>
);

export const PrefixedIcon = () => (
    <Grid>
        <Wrapper gapTop={4}>
            <Button>
                <TagIcon />
                <Text variant="label">{'Create Tag'}</Text>
            </Button>
            <Button size="xs">
                <TagIcon />
                <Text variant="label">{'Create Tag'}</Text>
            </Button>
        </Wrapper>
        <Wrapper gapTop={4}>
            <Button variant="flat">
                <TagIcon />
                <Text variant="label">{'Create Tag'}</Text>
            </Button>
            <Button size="xs" variant="flat">
                <TagIcon />
                <Text variant="label">{'Create Tag'}</Text>
            </Button>
        </Wrapper>
    </Grid>
);

export const SuffixedIcon = () => (
    <Grid>
        <Wrapper gapTop={4}>
            <Button color="text" reverseLabel>
                <CheckIcon />
                <Text variant="label">{'Done'}</Text>
            </Button>
            <Button color="text" reverseLabel size="xs">
                <CheckIcon />
                <Text variant="label">{'Done'}</Text>
            </Button>
        </Wrapper>
        <Wrapper gapTop={4}>
            <Button color="green" reverseLabel variant="flat">
                <CheckIcon />
                <Text variant="label">{'Done'}</Text>
            </Button>
            <Button color="green" reverseLabel size="xs" variant="flat">
                <CheckIcon />
                <Text variant="label">{'Done'}</Text>
            </Button>
        </Wrapper>
    </Grid>
);

export default {
    component: Button,
    title: 'Buttons/Button',
};

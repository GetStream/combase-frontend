import React from 'react';

import Avatar from '../Avatar';
import {BadgeIcon as Badge} from '../icons';
import Entity from '../Entity';
import IconLabel from '../IconLabel';
import Text from '../Text';

import ListItem from './ListItem';

export const Default = () => (
    <ListItem>
        <Entity icon={<Avatar name="Luke" size={5} />}>
            <Text fontSize={3} lineHeight={3}>
                {'Luke'}
            </Text>
            <IconLabel color="altText">
                <Badge color="green" />
                <Text color="textA.56" fontSize={2} lineHeight={2} variant="label">
                    {'Active Now'}
                </Text>
            </IconLabel>
        </Entity>
    </ListItem>
);

export const Selectable = () => (
    <ListItem selectable>
        <Entity icon={<Avatar name="Luke" size={5} />}>
            <Text fontSize={3} lineHeight={3}>
                {'Luke'}
            </Text>
            <IconLabel color="altText">
                <Badge color="green" />
                <Text color="textA.56" fontSize={2} lineHeight={2} variant="label">
                    {'Active Now'}
                </Text>
            </IconLabel>
        </Entity>
    </ListItem>
);

export default {
    component: ListItem,
    title: 'Lists/ListItem',
};

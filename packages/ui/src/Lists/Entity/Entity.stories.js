import React from 'react';

import Avatar from '../../Avatar';
import { Badge } from '../../Feedback';
import IconLabel from '../../IconLabel';
import { Text } from '../../Text';

import { AgentEntity, Entity, GroupEntity, TagEntity } from '.';

export const User = () => (
    <Entity icon={<Avatar name="Luke" size={6} />}>
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
);

export const Agent = () => (
    <AgentEntity avatar="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-4d0ebdff049c-512" role="Customer Support" name="Luke" />
);

export const Group = () => <GroupEntity color="purple" name="Sales" memberCount={10} />;

export const Tag = () => <TagEntity />;

export const Organization = () => (
    <Entity icon={<Avatar name="Luke" size={6} src="https://pbs.twimg.com/profile_images/735113666891128833/mBSAJI_h_400x400.jpg" />}>
        <Text fontSize={3} lineHeight={3}>
            {'Stream'}
        </Text>
        <Text opacity={0.56} variant="label">
            {'Boulder, CO • Amsterdam, NL'}
        </Text>
    </Entity>
);

export default {
    component: Entity,
    title: 'Lists/Entity',
};

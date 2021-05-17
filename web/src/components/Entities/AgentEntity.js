import React from 'react';
import { Avatar, Entity, Text } from '@combase.app/ui';

const AgentEntity = ({ avatar, name, meta }) => (
    <Entity icon={<Avatar name={name} size={8} src={avatar} />}>
        <Text fontSize={4} lineHeight={4}>
            {name}
        </Text>
        <Text color="text" opacity={0.56} fontSize={2} lineHeight={2}>
            {meta}
        </Text>
    </Entity>
);

export default AgentEntity;

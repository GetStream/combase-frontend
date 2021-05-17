import React from 'react';
import { IconBubble, Text, Label, Entity } from '@combase.app/ui';

const GroupEntity = ({ color, emoji, name }) => (
    <Entity icon={<IconBubble size={7} color={color} variant="ghost" emoji={emoji} name={name} />}>
        <Label color={color || 'primary'}>
            <Text>{name}</Text>
        </Label>
    </Entity>
);

export default GroupEntity;

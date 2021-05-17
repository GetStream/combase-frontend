import React from 'react';

import { TagIcon, Entity, Label, Text } from '@combase.app/ui';

const TagEntity = ({ name }) => (
    <Entity>
        <Label color="yellow" size={4}>
            <TagIcon color="yellow" />
            <Text color="text" fontSize={3} lineHeight={2}>
                {name}
            </Text>
        </Label>
    </Entity>
);

export default TagEntity;
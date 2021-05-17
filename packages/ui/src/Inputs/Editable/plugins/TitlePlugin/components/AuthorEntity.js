import React from 'react';
import { Avatar, Entity, Text } from '@combase.app/ui';

const AuthorEntity = ({ avatar, name, updatedAt }) => (
    <Entity icon={<Avatar name={name} size={6} src={avatar} />}>
        <Text fontSize={3} lineHeight={3}>
            {name}
        </Text>
        <Text color="textA.56" fontSize={1} lineHeight={1}>
            Last Updated: {updatedAt}
        </Text>
    </Entity>
);

export default AuthorEntity;

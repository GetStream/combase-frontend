import Avatar from '../../Avatar';
import Text from '../../Text';

import { Entity } from './Entity';

export const AuthorEntity = ({ avatar, name, updatedAt }) => (
    <Entity icon={<Avatar name={name} size={4} src={avatar} />}>
        <Text fontSize={3} lineHeight={3}>
            {name}
        </Text>
        <Text color="textA.56" fontSize={1} lineHeight={1}>
            Last Updated: {updatedAt}
        </Text>
    </Entity>
);

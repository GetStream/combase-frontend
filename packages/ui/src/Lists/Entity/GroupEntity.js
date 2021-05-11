import IconBubble from '../../IconBubble';
import { Text } from '../../Text';
import Label from '../../Label';

import { Entity } from './Entity';

export const GroupEntity = ({ color, emoji, name }) => (
    <Entity icon={<IconBubble size={7} color={color} variant="ghost" emoji={emoji} name={name} />}>
        <Label color={color || 'primary'}>
            <Text>{name}</Text>
        </Label>
    </Entity>
);

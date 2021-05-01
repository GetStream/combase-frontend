import { ConversationsIcon, TagIcon } from '../../icons';
import { IconLabel } from '../../IconLabel';
import { Text } from '../../Text';

import { Entity } from './Entity';

export const TagEntity = () => (
    <Entity>
        <IconLabel size={4}>
            <TagIcon color="yellow" />
            <Text color="text" fontSize={3} lineHeight={2}>
                {'react'}
            </Text>
        </IconLabel>
        <div>
            <IconLabel color="text" opacity={0.56} size={2}>
                <ConversationsIcon />
                <Text fontSize={2} lineHeight={3}>
                    {10}
                </Text>
            </IconLabel>
        </div>
    </Entity>
);

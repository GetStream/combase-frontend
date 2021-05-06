import { Box } from '../../Layout';
import { ConversationsIcon, TagIcon } from '../../icons';
import { IconLabel } from '../../IconLabel';
import { Label } from '../../Label';
import { Text } from '../../Text';

import { Entity } from './Entity';

export const TagEntity = ({ name }) => (
    <Entity>
        <Label color="yellow" size={4}>
            <TagIcon color="yellow" />
            <Text color="text" fontSize={3} lineHeight={2}>
                {name}
            </Text>
        </Label>
    </Entity>
);

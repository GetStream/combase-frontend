import { Box } from '../../Layout';
import { ConversationsIcon, TagIcon } from '../../icons';
import { IconLabel } from '../../IconLabel';
import { Label } from '../../Label';
import { Text } from '../../Text';

import { Entity } from './Entity';

export const TagEntity = () => (
    <Entity>
        <Label color="yellow" size={4}>
            <TagIcon color="yellow" />
            <Text color="text" fontSize={3} lineHeight={2}>
                {'react'}
            </Text>
        </Label>
        <Box marginTop={1}>
            <IconLabel color="text" opacity={0.56} size={2}>
                <ConversationsIcon />
                <Text fontSize={2} lineHeight={3}>
                    {10}
                </Text>
            </IconLabel>
        </Box>
    </Entity>
);

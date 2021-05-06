import { memo } from 'react';

import { TagEntity } from '../Entity';
import { ListItem } from '../ListItem';

export const TagListItem = memo(({ amount, name, ...rest }) => (
    <ListItem {...rest}>
        <TagEntity name={name} />
    </ListItem>
));

import { memo } from 'react';
import { TagEntity, ListItem } from '@combase.app/ui';

export const TagListItem = memo(({ amount, name, ...rest }) => (
    <ListItem {...rest}>
        <TagEntity name={name} />
    </ListItem>
));

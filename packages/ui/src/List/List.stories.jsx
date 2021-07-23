import React from 'react';

import { FilterIcon } from '../icons';
import MenuItem from '../MenuItem';
import List from './List';

const noop = () => null;

export const Default = () => {
    return (
        <List>
            <MenuItem icon={FilterIcon} label="Created at" onClick={noop}>
                <MenuItem icon={FilterIcon} label="Ascending" onClick={noop} />
                <MenuItem icon={FilterIcon} label="Descending" onClick={noop} />
            </MenuItem>
            <MenuItem icon={FilterIcon} label="Updated (Asc)" onClick={noop} />
            <MenuItem icon={FilterIcon} label="Update (Desc)" onClick={noop} showEmpty />
        </List>
    );
};

export default {
    component: List,
    title: 'Lists/List',
};

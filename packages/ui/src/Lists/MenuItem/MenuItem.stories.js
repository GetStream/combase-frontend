import React from 'react';

import { Box } from '../../Layout';
import { IconButton } from '../../Buttons';
import { AddIcon, AllInboxesIcon, ChevronRightIcon, InboxIcon, PriorityIcon, SearchIcon, StarIcon, TagIcon, UnassignedIcon } from '../../icons';
import { Menu } from '../Menu';

import { MenuItem } from '.';

const noop = () => null;

export const MenuItems = () => (
    <Box>
        <Menu subheading="Conversations">
            <MenuItem actions={[<ChevronRightIcon color="border" key={0} size={4} />]} icon={AllInboxesIcon} label="All" onClick={noop} />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={InboxIcon}
                iconColor="blue"
                label="Inbox"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={UnassignedIcon}
                iconColor="lavender"
                label="Unassigned"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={PriorityIcon}
                iconColor="red"
                label="Priority"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={StarIcon}
                iconColor="yellow"
                label="Starred"
                onClick={noop}
            />
        </Menu>
        <Menu>
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={TagIcon}
                iconColor="altTextA.40"
                label="All"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={TagIcon}
                iconColor="altTextA.40"
                label="Inbox"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={TagIcon}
                iconColor="altTextA.40"
                label="Unassigned"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={TagIcon}
                iconColor="altTextA.40"
                label="Priority"
                onClick={noop}
            />
            <MenuItem
                actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                icon={TagIcon}
                iconColor="altTextA.40"
                label="Starred"
                onClick={noop}
            />
        </Menu>
    </Box>
);
export const Display = () => <MenuItem icon={StarIcon} iconColor="yellow" label="Label" />;

export const WithActions = () => (
    <MenuItem
        actions={[<IconButton color="text" icon={SearchIcon} key={0} size={4} />, <IconButton color="text" icon={AddIcon} key={1} size={4} />]}
        icon={StarIcon}
        iconColor="yellow"
        label="Label"
        onClick={noop}
    />
);
export const NoIcon = () => <MenuItem actions={[<ChevronRightIcon color="border" key={0} size={4} />]} label="Label" onClick={noop} />;
export const Default = () => (
    <MenuItem actions={[<IconButton color="text" icon={SearchIcon} key={0} size={4} />]} icon={InboxIcon} label="Inbox" onClick={noop} />
);

export default {
    component: MenuItem,
    title: 'Lists/MenuItem',
};

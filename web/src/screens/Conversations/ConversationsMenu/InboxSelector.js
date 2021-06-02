import {
    ArchiveIcon,
    Badge,
    GroupIcon,
    InboxIcon,
    MenuItem,
    PriorityIcon,
    StarIcon,
    Menu,
    UnassignedIcon,
} from '@combase.app/ui';

import NavigationMenuItem from 'components/NavigationMenuItem';

const InboxSelector = ({ onClickItem }) => (
    <>
        <NavigationMenuItem color="primary" icon={InboxIcon} label="Inbox" to="/dashboard/conversations/inbox" onClick={onClickItem} />
        <NavigationMenuItem color="red" icon={PriorityIcon} label="Priority" to="/dashboard/conversations/priority" onClick={onClickItem} />
        <NavigationMenuItem color="yellow" icon={StarIcon} label="Starred" to="/dashboard/conversations/starred" onClick={onClickItem} />
        <NavigationMenuItem icon={ArchiveIcon} label="Archive" to="/dashboard/conversations/archived" onClick={onClickItem} />
        <Menu>
            <NavigationMenuItem
                color="text"
                icon={UnassignedIcon}
                label="New & Unassigned"
                to="/dashboard/conversations/unassigned"
                onClick={onClickItem}
            />
        </Menu>
        {/* <Menu>
            <MenuItem icon={GroupIcon} label="Groups">
                <MenuItem iconColor="red" iconSize={0} icon={Badge} label="React" onClick={onClickItem} />
                <MenuItem iconColor="yellow" iconSize={0} icon={Badge} label="DevRel" onClick={onClickItem} />
                <MenuItem iconColor="purple" iconSize={0} icon={Badge} label="Sales" onClick={onClickItem} />
                <MenuItem iconColor="teal" iconSize={0} icon={Badge} label="Marketing" onClick={onClickItem} />
                <MenuItem iconColor="green" iconSize={0} icon={Badge} label="Android" onClick={onClickItem} />
            </MenuItem>
        </Menu> */}
    </>
);

export default InboxSelector;

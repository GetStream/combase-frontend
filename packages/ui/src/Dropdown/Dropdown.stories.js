import React, { useState } from 'react';
import styled from 'styled-components';
import { layout, shadow } from '@combase.app/styles';

import Dropdown from './Dropdown';
import Popover from '../Popover';
import Button from '../Button';
import IconButton from '../IconButton';
import { DropdownIcon, SortIcon } from '../icons';
import Box from '../Box';
import MenuItem from '../MenuItem';
import Text from '../Text';
import {
    AllInboxesIcon,
    InboxIcon,
    ChevronRightIcon,
    UnassignedIcon,
    StarIcon,
    PriorityIcon,
    LockIcon,
    SettingsIcon,
    SupportIcon,
    SwitchThemeIcon,
} from '../icons';
import Avatar from '../Avatar';

const Page = styled.div`
    height: calc(100vh - 2rem);
    margin-bottom: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Root = styled(Box)`
    ${layout};
    ${shadow.boxShadow};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const noop = () => {};

export const DropdownMenu = () => {
    const [anchorRef, setAnchorRef] = useState();

    return (
        <div>
            <Page>
                <Root marginX="auto" padding={4}>
                    <Popover
                        anchor={anchorRef}
                        as={Dropdown}
                        onClose={() => setAnchorRef(false)}
                        placement="bottom-end"
                        subheading="Sorting options"
                    >
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                    </Popover>
                    <Button color="text" onClick={(_, e) => setAnchorRef(e.nativeEvent.target)} variant="flat">
                        <SortIcon />
                        <Text>{'Sort'}</Text>
                        <DropdownIcon opacity={0.56} />
                    </Button>
                </Root>
            </Page>
        </div>
    );
};

export const ScrollableDropdownMenu = () => {
    const [anchorRef, setAnchorRef] = useState();

    return (
        <div>
            <Page>
                <Root borderRadius={2} boxShadow={6} marginX="auto" maxHeight={10} maxWidth={10} padding={4}>
                    <Popover anchor={anchorRef} as={Dropdown} maxHeight={14} onClose={() => setAnchorRef(false)} placement="bottom-end">
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                        <MenuItem label="A to Z" onClick={() => null} />
                        <MenuItem label="Z to A" onClick={() => null} />
                        <MenuItem label="Newest First" onClick={() => null} />
                        <MenuItem label="Oldest First" onClick={() => null} />
                    </Popover>
                    <Button color="text" onClick={(_, e) => setAnchorRef(e.nativeEvent.target)} variant="flat">
                        <SortIcon />
                        <Text>{'Sort'}</Text>
                        <DropdownIcon opacity={0.56} />
                    </Button>
                </Root>
            </Page>
        </div>
    );
};
const mods = [
    {
        name: 'offset',
        options: {
            offset: [0, 8],
        },
    },
];
export const ThemeSwitcher = () => {
    const [anchorRef, setAnchorRef] = useState(null);

    return (
        <div>
            <Page>
                <Root borderRadius={2} boxShadow={6} marginX="auto" maxHeight={10} maxWidth={10} padding={4}>
                    <Popover
                        anchor={anchorRef}
                        as={Dropdown}
                        modifiers={mods}
                        maxHeight={12}
                        onClose={() => setAnchorRef(false)}
                        placement="right-end"
                        subheading="UI Theme"
                    >
                        <MenuItem icon={SwitchThemeIcon} label="Light" onClick={() => null} />
                        <MenuItem icon={SwitchThemeIcon} label="Dark" onClick={() => null} />
                        <MenuItem icon={SwitchThemeIcon} label="System (auto)" onClick={() => null} />
                    </Popover>
                    <IconButton color="text" onClick={(_, e) => setAnchorRef(e.target)} icon={SwitchThemeIcon} />
                </Root>
            </Page>
        </div>
    );
};

export const AccountMenu = () => {
    const [anchorRef, setAnchorRef] = useState(null);

    return (
        <div>
            <Page>
                <Root borderRadius={2} boxShadow={6} marginX="auto" maxHeight={10} maxWidth={10} padding={4}>
                    <Popover
                        anchor={anchorRef}
                        as={Dropdown}
                        modifiers={mods}
                        onClose={() => setAnchorRef(false)}
                        placement="right-end"
                        subheading="Your Combase"
                        header={
                            <Box padding={2} marginBottom={1}>
                                <AgentEntity name="Luke" role="Customer Support" />
                            </Box>
                        }
                    >
                        <MenuItem icon={SettingsIcon} color="textA.64" label="Settings" onClick={() => null} variant="sm" />
                        <MenuItem icon={SupportIcon} color="textA.64" label="Help" onClick={() => null} variant="sm" />
                        <MenuItem icon={LockIcon} color="red" label="Logout" onClick={() => null} variant="sm" />
                    </Popover>
                    <Avatar color="text" name="Luke" onClick={e => setAnchorRef(e.target)} icon={SwitchThemeIcon} />
                </Root>
            </Page>
        </div>
    );
};

export const InboxMenu = () => {
    const [anchorRef, setAnchorRef] = useState();

    return (
        <div>
            <Page>
                <Root marginX="auto" padding={4}>
                    <Popover anchor={anchorRef} as={Dropdown} onClose={() => setAnchorRef(false)} placement="bottom-end" subheading="Inboxes">
                        <MenuItem
                            actions={[<ChevronRightIcon color="border" key={0} size={4} />]}
                            icon={AllInboxesIcon}
                            label="All"
                            onClick={noop}
                        />
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
                    </Popover>
                    <Button color="text" onClick={(_, e) => setAnchorRef(e.nativeEvent.target)} variant="flat">
                        <Text>{'Open Me'}</Text>
                        <DropdownIcon opacity={0.56} />
                    </Button>
                </Root>
            </Page>
        </div>
    );
};

export default {
    component: DropdownMenu,
    title: 'Popovers/Dropdown',
};

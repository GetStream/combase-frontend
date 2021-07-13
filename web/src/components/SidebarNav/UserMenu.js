import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GET_CURRENT_USER, useQuery } from '@combase.app/apollo';
import { UserIcon, Avatar, Box, Dropdown, LockIcon, MenuItem, Popover, SupportIcon, usePopoverState } from '@combase.app/ui';

import {AgentEntity} from 'components/Entities';

const popperModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
];

const ThemeToggle = ({ size }) => {
    const [anchorRef, { open, toggle: toggleOpen }] = usePopoverState();
    const { data } = useQuery(GET_CURRENT_USER);
    const me = data?.me;

    return (
        <>
            <Avatar
                name={me?.name?.full}
                src={me?.avatar}
                size={7}
                onClick={toggleOpen}
				ref={anchorRef}
                style={{ cursor: 'pointer' }}
            />
            <Popover
                anchor={anchorRef.current}
                as={Dropdown}
				open={open}
                modifiers={popperModifiers}
                onClose={() => toggleOpen(false)}
                placement="right-end"
                subheading="Your Combase"
                header={
                    <Box padding={2} marginBottom={1}>
                        <AgentEntity avatar={me?.avatar} name={me?.name?.display} meta={me?.role} />
                    </Box>
                }
            >
                <MenuItem icon={UserIcon} color="text" label="Profile Settings" onClick={() => null} variant="sm" />
                <MenuItem icon={SupportIcon} color="text" label="Help" onClick={() => null} variant="sm" />
                <MenuItem icon={LockIcon} color="red" label="Logout" onClick={() => null} variant="sm" />
            </Popover>
        </>
    );
};

ThemeToggle.propTypes = {
    size: PropTypes.number,
};

export default ThemeToggle;

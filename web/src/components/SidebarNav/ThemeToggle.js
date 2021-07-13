import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setUITheme, themeVar, useReactiveVar } from '@combase.app/apollo';
import { CheckCircleIcon, Dropdown, IconButton, MenuItem, Popover, SwitchThemeIcon, Tooltip, usePopoverState } from '@combase.app/ui';

const popperModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 8],
        },
    },
];

const themeOpts = [
    ['Light', 'light'],
    ['Dark', 'dark'],
    ['System (auto)', 'system'],
];

const ThemeToggle = ({ size }) => {
    const [anchorRef, { open, toggle: toggleOpen }] = usePopoverState();
    const themeMode = useReactiveVar(themeVar);

    return (
        <>
            <div ref={anchorRef}>
				<Tooltip text="Switch Theme" placement="right">
					<IconButton size={size} icon={SwitchThemeIcon} onClick={toggleOpen} />
				</Tooltip>
			</div>
            <Popover
                anchor={anchorRef.current}
                as={Dropdown}
				open={open}
                modifiers={popperModifiers}
                onClose={() => toggleOpen(false)}
                placement="right-end"
                subheading="UI Theme"
            >
                {themeOpts.map(([label, value]) => (
                    <MenuItem
                        icon={SwitchThemeIcon}
                        iconSize={1}
                        key={value}
                        label={label}
                        active={themeMode === value}
                        onClick={() => setUITheme(value)}
                        variant="sm"
                        actions={[themeMode === value ? <CheckCircleIcon size={3} /> : undefined]}
                    />
                ))}
            </Popover>
        </>
    );
};

ThemeToggle.propTypes = {
    size: PropTypes.number,
};

export default ThemeToggle;

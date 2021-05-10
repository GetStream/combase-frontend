import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setUITheme, themeVar, useReactiveVar } from '@combase.app/apollo';
import { CheckCircleIcon, Dropdown, IconButton, MenuItem, Popover, SwitchThemeIcon, Tooltip } from '@combase.app/ui';

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
    const [anchorRef, setAnchorRef] = useState();
    const themeMode = useReactiveVar(themeVar);

    return (
        <>
            <Tooltip text="Switch Theme" placement="right">
                <IconButton size={size} icon={SwitchThemeIcon} onClick={(_, e) => setAnchorRef(e.nativeEvent.target)} />
            </Tooltip>
            <Popover
                anchor={anchorRef}
                as={Dropdown}
                modifiers={popperModifiers}
                onClose={() => setAnchorRef(false)}
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

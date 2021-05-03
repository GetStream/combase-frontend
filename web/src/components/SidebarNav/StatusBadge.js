import { useState } from 'react';
import { Badge, Dropdown, MenuItem, Popover, Switch, Tooltip } from '@combase.app/ui';
import { useConnectionStatus } from '@combase.app/chat';

const popperModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
];

const StatusBadge = () => {
    const [anchorRef, setAnchorRef] = useState();
    const online = useConnectionStatus();

    return (
        <>
            <Tooltip text={online ? 'Online' : 'Offline'} placement="right">
                <Badge color={online ? 'green' : 'gray'} size={0} onClick={e => setAnchorRef(e.nativeEvent.target)} />
            </Tooltip>
            <Popover
                anchor={anchorRef}
                as={Dropdown}
                modifiers={popperModifiers}
                onClose={() => setAnchorRef(false)}
                placement="right-end"
                subheading="Your Status"
            >
                <MenuItem icon={Badge} iconSize={0} iconColor="green" label="Online" onClick={() => null} variant="sm" />
                <MenuItem icon={Badge} iconSize={0} iconColor="orange" label="Away" onClick={() => null} variant="sm" />
                <MenuItem icon={Badge} iconSize={0} iconColor="disabled" label="Offline" onClick={() => null} variant="sm" />
                <MenuItem variant="sm" actions={[<Switch size={1} value />]} label="Notification Sounds" />
            </Popover>
        </>
    );
};

export default StatusBadge;

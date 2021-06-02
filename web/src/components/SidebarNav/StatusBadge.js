import { useState } from 'react';
import { Badge, Dropdown, MenuItem, Popover, Switch, Tooltip } from '@combase.app/ui';
import { useQuery, GET_CURRENT_USER } from '@combase.app/apollo';

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
    const { data } = useQuery(GET_CURRENT_USER);

	const {online} = data?.me || {};

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
                <MenuItem icon={Badge} iconSize="small" iconColor="green" label="Online" onClick={() => null} variant="sm" />
                <MenuItem icon={Badge} iconSize="small" iconColor="orange" label="Away" onClick={() => null} variant="sm" />
                <MenuItem icon={Badge} iconSize="small" iconColor="disabled" label="Offline" onClick={() => null} variant="sm" />
                <MenuItem variant="sm" actions={[<Switch size={1} value />]} label="Notification Sounds" />
            </Popover>
        </>
    );
};

export default StatusBadge;

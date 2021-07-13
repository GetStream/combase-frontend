import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Dropdown, MenuItem, Popover, usePopoverState, Switch, Tooltip } from '@combase.app/ui';
import { useChatContext } from 'stream-chat-react';

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
	const [anchorRef, { open, toggle: toggleOpen }] = usePopoverState();
    const { data } = useQuery(GET_CURRENT_USER);
	const { client } = useChatContext();
	const [online, setStatus] = useState();

	const appearOffline = useCallback(async (invisible) => {
		try {
			await client.upsertUser({
				id: data.me._id,
				invisible,
			});

			const { users: [me] } = await client.queryUsers({ 
				id: { 
					$in: [ client.userID ] 
				}},  
				{},  
				{ presence: true } 
			);

			setStatus(me.online);
			toggleOpen(false);
		} catch (error) {
			console.log(error);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [client, data]);

	useEffect(() => {
		appearOffline(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    return (
        <>
            <div ref={anchorRef}>
				<Tooltip text={online ? 'Online' : 'Offline'} placement="right">
					<Badge color={online ? 'green' : 'gray'} size={0} onClick={toggleOpen} />
				</Tooltip>
			</div>
            <Popover
                anchor={anchorRef.current}
                as={Dropdown}
				open={open}
                modifiers={popperModifiers}
                onClose={() => toggleOpen(false)}
                placement="right-end"
                subheading="Your Status"
            >
                <MenuItem icon={Badge} iconSize="small" iconColor="green" label="Online" onClick={() => appearOffline(false)} variant="sm" />
                <MenuItem icon={Badge} iconSize="small" iconColor="disabled" label="Appear Offline" onClick={() => appearOffline(true)} variant="sm" />
                <MenuItem variant="sm" actions={[<Switch size={1} value />]} label="Notification Sounds" />
            </Popover>
        </>
    );
};

export default StatusBadge;

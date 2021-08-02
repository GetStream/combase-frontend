import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useChatContext } from 'stream-chat-react';
import { Scrollbars } from 'rc-scrollbars';

import Box from '@combase.app/ui/Box';
import Container from '@combase.app/ui/Container';
import Dropdown from '@combase.app/ui/Dropdown';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import { ClockIcon, CloseIcon, DropdownIcon, MailIcon, PinIcon } from '@combase.app/ui/icons';
import MenuItem from '@combase.app/ui/MenuItem';
import Popover, { usePopoverState } from '@combase.app/ui/Popover';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

import HeaderBase from 'components/HeaderBase';
import InfoItem from 'components/InfoItem';
import UserDisplay from 'components/UserDisplay';
import useTicket from 'hooks/useTicket';
import useUserCurrentTime from 'hooks/useUserCurrentTime';

import DynamicActionsGrid from './DynamicActionsGrid';

const Root = styled(Box)`
    width: ${({ theme }) => theme.sizes.drawer};
	border-left: 1px solid ${({ theme }) => theme.colors.border };
	display: grid;
	grid-template-rows: 1fr;
	& .rc-scrollbars-view {
		display: grid;
		grid-template-rows: ${({ theme }) => theme.sizes[12]} 1fr;
	}
`;

const Header = styled(HeaderBase)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border: none;
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 1;
`;

const ChatDrawer = ({ onClose }) => {
	const { channel } = useChatContext();
	const [headerMenuAnchorRef, { open: headerMenuOpen, toggle: toggleHeaderMenu }] = usePopoverState();
	const { data, loading } = useTicket(channel?.id);
	
	const ticket = data?.organization?.ticket;
	const currentTime = useUserCurrentTime(ticket?.user?.timezone);

	const userLoc = useMemo(() => {
		if (!ticket?.user?.timezone) return '-';
		return ticket?.user?.timezone?.split('/')[1].replace(/_/gu, ' ');
	}, [ticket]);

	return (
		<Root>
			<Scrollbars>
				<Header>
					<IconLabel ref={headerMenuAnchorRef} gap={2} onClick={toggleHeaderMenu} style={{cursor: "pointer"}}>
						<Text fontSize={4} fontWeight={800} lineHeight={4}>Overview</Text>
						<DropdownIcon size={4} />
					</IconLabel>
					<Popover anchor={headerMenuAnchorRef.current} as={Dropdown} open={headerMenuOpen} placement="bottom-start" onClose={() => toggleHeaderMenu(false)}>
						<MenuItem label="Overview" />
						<MenuItem label="Activity" />
					</Popover>
					<IconButton variant="filled" icon={CloseIcon} onClick={onClose} />
				</Header>
				<Box>
					<UserDisplay 
						_id={ticket?.user?._id}
						avatar={ticket?.user?.avatar}
						name={ticket?.user?.name}
						loading={loading}
						meta={userLoc}
						metaIcon={PinIcon}
						paddingY={4} 	
					/>
					<Container paddingX={6}>
						<InfoItem 
							marginY={6}
							icon={MailIcon}
							label="Email Address"
							value={ticket?.user?.email}
						/>
						<InfoItem 
							marginY={6}
							icon={ClockIcon}
							label="Current Time"
							value={currentTime}
						/>
						<DynamicActionsGrid />
					</Container>
				</Box>
			</Scrollbars>
		</Root>
	);
}

export default ChatDrawer;
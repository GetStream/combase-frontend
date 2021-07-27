import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useChatContext } from 'stream-chat-react';
import { Scrollbars } from 'rc-scrollbars';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Container from '@combase.app/ui/Container';
import Dropdown from '@combase.app/ui/Dropdown';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import { BadgeIcon, ClockIcon, CloseIcon, DropdownIcon, MailIcon, PinIcon, ZendeskIcon } from '@combase.app/ui/icons';
import MenuItem from '@combase.app/ui/MenuItem';
import Popover, { usePopoverState } from '@combase.app/ui/Popover';
import Text from '@combase.app/ui/Text';
import TextGroup from '@combase.app/ui/TextGroup';

import HeaderBase from 'components/HeaderBase';
import useChatUserPresence from 'hooks/useChatUserPresence';
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

const UserProfile = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ChatDrawer = ({ onClose }) => {
	const { channel } = useChatContext();
	const [headerMenuAnchorRef, { open: headerMenuOpen, toggle: toggleHeaderMenu }] = usePopoverState();
	const { data } = useTicket(channel?.id);
	
	const ticket = data?.organization?.ticket;
	const currentTime = useUserCurrentTime(ticket?.user?.timezone);
	const isOnline = useChatUserPresence(ticket?.user?._id);

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
					<UserProfile paddingY={4}>
						<Avatar name={ticket?.user?.name} variant={null} borderRadius={5} size={16} />
						<TextGroup paddingY={3} variant="centered">
							<IconLabel>
								<Text fontSize={5} lineHeight={5} fontWeight={700}>
									{ticket?.user?.name}
								</Text>
								{
									isOnline ? (
										<Tooltip text="Online Now" placement="top">
											<BadgeIcon color="green" size={4} />
										</Tooltip>
									) : null
								}
							</IconLabel>
							<IconLabel>
								{ticket?.user?.timezone ? <PinIcon color="altText" /> : null}
								<Text color='altText' fontSize={4} fontWeight={400} lineHeight={4}>
									{userLoc}
								</Text>
							</IconLabel>
						</TextGroup>
					</UserProfile>
					<Container paddingX={6}>
						<TextGroup marginY={6}>
							<IconLabel>
								<MailIcon size={5} />
								<Text fontSize={4} fontWeight={700} lineHeight={4}>Email Address</Text>
							</IconLabel>
							<Text opacity={0.56} fontWeight={400}>
								{ticket?.user?.email}
							</Text>
						</TextGroup>
						<TextGroup marginY={6}>
							<IconLabel>
								<ClockIcon size={5} />
								<Text fontSize={4} fontWeight={700} lineHeight={4}>Current Time</Text>
							</IconLabel>
							<Text opacity={0.56} fontWeight={400}>
								{currentTime}
							</Text>
						</TextGroup>
						<DynamicActionsGrid />
					</Container>
				</Box>
			</Scrollbars>
		</Root>
	);
}

export default ChatDrawer;
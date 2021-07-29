import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { itemGap } from '@combase.app/styles';

import { 
	getDisplayImage,
	getDisplayTitle,
	useChatContext,
	useTypingContext,
} from 'stream-chat-react';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import Dropdown from '@combase.app/ui/Dropdown';
import Entity from '@combase.app/ui/Entity';
import IconButton from '@combase.app/ui/IconButton';
import IconLabel from '@combase.app/ui/IconLabel';
import { BadgeIcon, ChatClosedIcon, ChatOpenIcon, ChevronRightIcon, DropdownIcon, InfoIcon } from '@combase.app/ui/icons';
import MenuItem from '@combase.app/ui/MenuItem';
import Popover, { usePopoverState } from '@combase.app/ui/Popover';
import Text from '@combase.app/ui/Text';

import useCurrentUser from 'hooks/useCurrentUser';
import useTicket from 'hooks/useTicket';
import { SET_TICKET_STATUS } from 'apollo/operations/ticket';

import { AssignTicketContext } from 'contexts/AssignTicket';

import HeaderBase from 'components/HeaderBase';

const Header = styled(HeaderBase)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const HeaderGroup = styled(Box)`
	display: flex;
	align-items: center;
	& > * + * {
		${itemGap};
	}
`;

const MenuButton = styled(Box)`
	user-select: none;
	cursor: pointer;
`;

const AssignedButton = styled(MenuButton)`
	background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.border, 0.56)};
`;

const STATUS = [
	{
		icon: ChatOpenIcon,
		label: "Open",
		value: 'open'
	},
	{
		icon: ChatClosedIcon,
		label: "Closed",
		value: 'closed'
	},
];

const CombaseChannelHeader = ({ onInfoClick }) => {
	const {channel, client} = useChatContext();
	const { typing = {} } = useTypingContext();
	const [_, setToAssign] = useContext(AssignTicketContext);
	const [setTicketStatus] = useMutation(SET_TICKET_STATUS);
	const currentUser = useCurrentUser();

	const [statusMenuRef, { open: statusMenuOpen, toggle: toggleStatusMenu }] = usePopoverState();
	const handleSetStatus = useCallback(async ({ target }) => {
		try {
			toggleStatusMenu();
			await setTicketStatus({
				optimisticResponse: {
					__typename: 'Mutation',
					ticketSetStatus: {
						record: {
							_id: channel.id,
							status: target.value,
							__typename: 'Ticket'
						},
						__typename: "UpdateByIdTicketPayload"
					}
				},
				update: (cache, { data: { ticketSetStatus } }) => {
					cache.modify({
						id: cache.identify(ticketSetStatus.record),
						fields: {
							status: () => {
								return ticketSetStatus.record.status
							},
						},
					});
				},
				variables: {
					_id: channel.id,
					status: target.value,
				}
			});
		} catch (error) {
			console.error(error);
		}
	}, [channel]);

	const {data} = useTicket(channel?.id);
	const agent = useMemo(() => {
		const [agentId] = data?.organization.ticket.agents || [];
		if (agentId) {
			return channel.state.members[agentId];
		}
		return null;
	}, [data]);

	const image = getDisplayImage(channel, client.user);
	const title = getDisplayTitle(channel, client.user);

	const typingInChannel = Object.values(typing).filter(
		({ parent_id, user }) => user?.id !== client.user?.id && !parent_id,
	);

	return (
		<>
			<Header>
				<Entity icon={<Avatar src={image} name={title} size={8} />}>
					<Text fontSize={4} lineHeight={4}>{title}</Text>
					{
						typingInChannel.length ? (
							<IconLabel color="altText" marginTop={1}>
								<Text fontSize={3} lineHeight={3}>is typing...</Text>
							</IconLabel>
						) : (
							<IconLabel color="altText" marginTop={1}>
								<BadgeIcon size={3} />
								<Text fontSize={3} lineHeight={3}>Offline</Text>
							</IconLabel>
						)
					}
				</Entity>
				<IconButton icon={InfoIcon} onClick={onInfoClick} />
			</Header>
			<Header height={8}>
				<HeaderGroup gapLeft={2}>
					{
						channel.data.status !== 'unassigned' ? (
							<>
								<MenuButton ref={statusMenuRef} onClick={() => toggleStatusMenu(true)} backgroundColor={`ticketStatus.${channel.data.status}`} paddingY="small" paddingLeft={2} paddingRight="small" borderRadius={1}>
									<IconLabel color="white">
										<Text fontSize={3} fontWeight={600} lineHeight={4} style={{textTransform: 'capitalize'}}>{channel.data.status}</Text>
										<DropdownIcon size={4} />
									</IconLabel>
								</MenuButton>
								<Popover subheading="Set Status" anchor={statusMenuRef.current} as={Dropdown} open={statusMenuOpen} placement="bottom-start" onClose={() => toggleStatusMenu(false)}>
									{STATUS.map((props) => <MenuItem {...props} active={props.value === channel.data.status} onClick={handleSetStatus} />)}
								</Popover>
							</>
						) : null}
					<AssignedButton paddingY="small" paddingLeft={1} paddingRight="small" borderRadius={1} onClick={() => setToAssign(channel?.id)}>
						{channel.data.status === 'unassigned' ? (
							<IconLabel gap={1}>
								<Text color="primary" fontSize={3} fontWeight={600} lineHeight={5}>Assign</Text>
								<ChevronRightIcon color="primary" size={3} />
							</IconLabel>
						) : (
							<IconLabel gap={2}>
								<Avatar size={3} name={agent?.user.name} />
								<Text fontSize={3} fontWeight={600} lineHeight={4}>{currentUser.data?.me?._id && agent?.user?.id === currentUser.data.me._id ? 'You' : agent?.user.name}</Text>
								<DropdownIcon size={4} />
							</IconLabel>
						)}
					</AssignedButton>
				</HeaderGroup>
			</Header>
		</>
	);
};

export default CombaseChannelHeader;
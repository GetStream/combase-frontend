import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ChannelList, getChannel, InfiniteScrollPaginator, useChatContext } from 'stream-chat-react';
import { Scrollbars } from 'rc-scrollbars';
import uniqBy from 'lodash.uniqby';
import { interactions } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import Dropdown from '@combase.app/ui/Dropdown';
import {LoadingScreen} from '@combase.app/ui/EmptyView';
import {AllInboxesIcon, ChatClosedIcon, ChatOpenIcon, ChatUnassignedIcon, DropdownIcon, InboxIcon} from '@combase.app/ui/icons';
import Popover, { usePopoverState } from '@combase.app/ui/Popover';
import IconLabel from '@combase.app/ui/IconLabel';
import MenuItem from '@combase.app/ui/MenuItem';
import Text from '@combase.app/ui/Text';

import HeaderBase from 'components/HeaderBase';

import useCurrentUser from 'hooks/useCurrentUser';

import CombaseChannelPreview from './CombaseChannelPreview';

const Root = styled(Box)`
	height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content 1fr;
	border-left: 1px solid ${({ theme }) => theme.colors.border};
	& .str-chat-channel-list {
		height: 100%;
    	overflow: scroll;
	}
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const FilterButton = styled(Box)`
	user-select: none;
	cursor: pointer;
	background-color: ${({ theme }) => theme.utils.colors.fade(theme.colors.border, 0.56)};
`;

const MenuButton = styled(Box)`
	${interactions}
	user-select: none;
	cursor: pointer;
	display: flex;
    flex-direction: row;
    align-items: center;
`;

const ChannelListRoot = styled(Box)`
	height: 100%;
`;

const STATUS = [
	{
		icon: ChatUnassignedIcon,
		label: "Unassigned",
		value: 'unassigned'
	},
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

const SCOPE = [
	{
		icon: AllInboxesIcon,
		label: "All Chats",
		value: 'all'
	},
	{
		icon: InboxIcon,
		label: "Your Chats",
		value: 'yours'
	},
];

const SORT = [
	{
		label: "Newest First",
		value: -1
	},
	{
		label: "Oldest First",
		value: 1
	},
];

const removeChannelFromList = (setChannels, updated) => {
	setChannels(prev => prev.filter(({ id }) => updated.channel_id !== id));
};

const Paginator = (props) => <InfiniteScrollPaginator LoadingIndicator={() => <LoadingScreen minHeight="unset" paddingY={4} />} threshold={350} {...props} />; 

const LoadingChannels = () => (
	<>
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
		<CombaseChannelPreview />
	</>
);

const List = React.forwardRef(({ children, loading, LoadingIndicator }, ref) => (
	<ChannelListRoot as={Scrollbars} $loading={loading} ref={ref}>
		{loading ? <LoadingIndicator /> : children}
	</ChannelListRoot>
));

const ChatList = () => {
	const {channel, client} = useChatContext();
	const currentUser = useCurrentUser();

	const [sortValue, setSort] = useState(-1);
	const [sortAnchorRef, { open: sortMenuOpen, toggle: toggleSortMenu }] = usePopoverState();
	const sorting = useMemo(() => SORT.filter(s => s.value === sortValue)?.[0], [sortValue]);
	const handleSetSort = ({ target }) => {
		setSort(target.value);
		toggleSortMenu(false);
	};
	
	const [scopeMenuRef, { open: scopeMenuOpen, toggle: toggleScopeMenu }] = usePopoverState();
	const [scopeValue, setScope] = useState('yours');
	const scope = useMemo(() => SCOPE.filter(s => s.value === scopeValue)?.[0], [scopeValue]);
	const handleSetScope = ({ target }) => {
		setScope(target.value);
		toggleScopeMenu(false);
	};
	
	const ScopeIcon = scope?.icon;

	const [inboxMenuRef, { open: inboxMenuOpen, toggle: toggleInboxMenu }] = usePopoverState();
	const [inbox, setInbox] = useState('open');
	const status = useMemo(() => STATUS.filter(s => s.value === inbox)?.[0], [inbox]);
	const handleSetInbox = ({ target }) => {
		setInbox(target.value);
		toggleInboxMenu(false);
	};

	const StatusIcon = status?.icon;

	const { filters, options, sort } = useMemo(() => {
		let filters = {
			$or: [
				{ status: inbox },
			],
		};

		let sort = {
			last_message_at: sortValue
		};

		let options = {
			presence: true,
		};

		if (scopeValue === 'yours' && inbox !== 'unassigned') {
			filters.members = {
				$in: [currentUser.data.me._id],
			};
		}

		return {
			filters,
			options,
			sort,
		};
	}, [currentUser, inbox, scopeValue, sortValue]);

	const onChannelUpdated = useCallback(async (setChannels, updated) => {
		// if (updated.channel_id === channel.id) {
		// 	// if update is on the active channel.
		// 	if (updated.channel.status !== inbox) {
		// 		setActiveChannel(null);
		// 	}
		// }

		const me = updated.channel.members.find(({ user_id }) => user_id === client.userID);
		if (!me) {
			removeChannelFromList(setChannels, updated);
		} else {
			if (updated.channel.status !== inbox) {
				removeChannelFromList(setChannels, updated);
			} else if (inbox !== 'unassigned' && updated.channel.status === inbox) {
				const channel = await getChannel(client, ...updated.cid.split(":"));
				setChannels(prev => uniqBy([channel, ...prev], ({cid}) => cid));
			}
		}	
	}, [channel, client, removeChannelFromList, inbox]);
	
	return (
		<Root>
			<Header paddingX={3}>
				<MenuButton as={IconLabel} ref={scopeMenuRef} onClick={toggleScopeMenu} gap={2}>
					<ScopeIcon color="primary" size={6} />
					<Text fontSize={5} fontWeight={600} lineHeight={7}>{scope.label}</Text>
					<DropdownIcon size={4} />
				</MenuButton>
				<Popover anchor={scopeMenuRef.current} as={Dropdown} open={scopeMenuOpen} placement="bottom-start" onClose={() => toggleScopeMenu(false)}>
					{SCOPE.map((props) => <MenuItem {...props} key={props.value} active={props.value === scopeValue} onClick={handleSetScope} />)}
				</Popover>
			</Header>
			<Header paddingX={4} height={8}>
				<MenuButton interaction="opacity">
					<IconLabel ref={inboxMenuRef} onClick={toggleInboxMenu} gap={2}>
						<StatusIcon size={4} />
						<Text variant="label" fontSize={3} fontWeight={600} lineHeight={4}>{status.label}</Text>
						<DropdownIcon size={4} />
					</IconLabel>
				</MenuButton>
				<Popover anchor={inboxMenuRef.current} as={Dropdown} open={inboxMenuOpen} placement="bottom-start" subheading="Select Inbox:" onClose={() => toggleInboxMenu(false)}>
					{STATUS.map((props) => <MenuItem {...props} key={props.value} active={props.value === inbox} onClick={handleSetInbox} />)}
				</Popover>
				<FilterButton ref={sortAnchorRef} onClick={toggleSortMenu} paddingY="small" paddingLeft={2} paddingRight="small" borderRadius={1}>
					<IconLabel gap={2}>
						<Text fontSize={3} fontWeight={600} lineHeight={4}>{sorting.label}</Text>
						<DropdownIcon size={4} />
					</IconLabel>
				</FilterButton>
				<Popover anchor={sortAnchorRef.current} as={Dropdown} open={sortMenuOpen} placement="bottom-end" onClose={() => toggleSortMenu(false)}>
					{SORT.map(props => <MenuItem {...props} key={props.value} active={props.value === sortValue} onClick={handleSetSort} />)}
				</Popover>
			</Header>
			<ChannelList 
				allowNewMessagesFromUnfilteredChannels={false}
				setActiveChannelOnMount={false}
				filters={filters}
				sort={sort}
				options={options}
				onChannelUpdated={onChannelUpdated}
				LoadingIndicator={LoadingChannels}
				// EmptyStateIndicator={EmptyState}
				Paginator={Paginator}
				List={List}
				Preview={CombaseChannelPreview}
			/>
		</Root>
	);
}

export default ChatList;
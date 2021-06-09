import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { 
	Avatar, 
	Box, 
	Button,
	ChannelHeader, 
	Container,
	DateSeparator, 
	DropdownIcon,
	EditMessageComposer,
	IconButton, 
	IconLabel,
	InfoIcon, 
	Message,
	MessageComposer,
	Spinner, 
	SystemMessage,
	Text,
	TicketLabelToggle, 
	Tooltip 
} from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-react';

import { useTicketLabelToggles, useReactiveMedia } from 'hooks';

import DetailDrawer from './DetailDrawer';
import { AssignTicketContext } from 'contexts/AssignTicket';

const Root  = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr ${({ drawer }) => (drawer ? `minmax(20%, 20rem)` : '')};
	
	& > div, .str-chat__container {
		height: 100%;
	}

	& .str-chat-channel {
		max-height: 100vh;
	}

	& .str-chat__list {
		position: relative;
		flex: 1 1;
		overflow-x: hidden;
		overflow-y: auto;
	}
`;

const ChannelWrapper = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-rows: min-content 1fr min-content;

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
`;

const LoadingIndicator = styled(Container).attrs(() => ({
	children: () => <Spinner size={5} />,
	paddingY: 4,
}))`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const UnassignedMsg = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;

	& > * + * {
		${itemGap};
	}
`;

const CombaseMessageInput = () => {
	const { channel } = useChatContext();
	const [_, setTicketToAssign] = useContext(AssignTicketContext);

	return <MessageComposer>
		{
			channel.data.status === 'unassigned' ? (
				<UnassignedMsg gapLeft={3} paddingTop={2}>
					<IconLabel>
						<InfoIcon color="warning" />
						<Text color="altText">This ticket is currently unassigned</Text>
					</IconLabel>
					<Button size="xs" variant="flat" onClick={() => setTicketToAssign(channel.id)}>
						<Text color="primary">Assign to...</Text>
					</Button>
				</UnassignedMsg>
			) : null
		}
	</MessageComposer>
};

const Conversation = () => {
	const [drawerOpen, toggleDrawer] = useToggle(false);
	const [_, setTicketToAssign] = useContext(AssignTicketContext);

	const { channel } = useChatContext();

	const isSm = useReactiveMedia('sm');
	const [starTicket, setPriority] = useTicketLabelToggles();

	return (
		<Root drawer={drawerOpen}>
			<Channel 
				Avatar={Avatar}
				DateSeparator={DateSeparator}
				EditMessageInput={EditMessageComposer}
				LoadingIndicator={LoadingIndicator}
				Message={Message}
				MessageSystem={SystemMessage}
				Input={CombaseMessageInput}
			>
				<ChannelWrapper>
					<ChannelHeader 
						isMobile={!isSm?.matches}
						toggles={[
							<Tooltip key={0} text="Star Conversation">
								<TicketLabelToggle type="star" onChange={(e) => starTicket(e, channel.id)} value={channel?.data?.starred || false} />
							</Tooltip>,
							<Tooltip key={1} text="Set Priority">
								<TicketLabelToggle type="priority" onChange={(e) => setPriority(e, channel.id)} value={channel?.data?.priority || 0} />
							</Tooltip>,
						]}
					>
						{
							channel?.data.status === 'unassigned' ? (
								<Button size="xs" variant="flat" color="altText" onClick={() => setTicketToAssign(channel.id)}>
									<IconLabel>
										<Text>Assign Ticket</Text>
										<DropdownIcon />
									</IconLabel>
								</Button>
							) : null
						}
						<Tooltip text="More Info">
							<IconButton color="altText" size={4} icon={InfoIcon} onClick={toggleDrawer} />
						</Tooltip>
					</ChannelHeader>
					<MessageList shouldGroupByUser />
					<MessageInput grow />
				</ChannelWrapper>
			</Channel>
			{drawerOpen ? <DetailDrawer onClose={toggleDrawer} /> : null}
		</Root>
	);
};

export default Conversation;
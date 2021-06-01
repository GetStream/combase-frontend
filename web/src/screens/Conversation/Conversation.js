import React from 'react';
import styled from 'styled-components';
import { Avatar, Box, ChannelHeader, Container, IconButton, InfoIcon, Spinner, TicketLabelToggle, Tooltip } from '@combase.app/ui';
import { Channel, MessageInput, MessageList, Window, useChatContext } from 'stream-chat-react';

import { useTicketLabelToggles, useReactiveMedia } from 'hooks';

import DateSeparator from 'components/DateSeparator';
import SystemMessage from 'components/SystemMessage';
import Message from 'components/Message';
import MessageComposer from 'components/MessageComposer';

const Root  = styled(Box)`
	height: 100%;
	display: grid;
	grid-template-rows: 1fr;
	
	& > div, .str-chat__container {
		height: 100%;
	}

	& .str-chat-channel {
		max-height: 100vh
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
	children: () => <Spinner size={4} />,
	paddingY: 4,
}))`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Conversation = () => {
	const { channel } = useChatContext()
	
	const isSm = useReactiveMedia('sm');
	const [starTicket, setPriority] = useTicketLabelToggles();
	
	return (
		<Root>
			<Channel 
				Avatar={Avatar}
				DateSeparator={DateSeparator}
				LoadingIndicator={LoadingIndicator}
				Message={Message}
				MessageSystem={SystemMessage}
				Input={MessageComposer}
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
						<Tooltip text="More Info">
							<IconButton color="altText" size={4} icon={InfoIcon} />
						</Tooltip>
					</ChannelHeader>
					<MessageList shouldGroupByUser />
					<MessageInput grow />
				</ChannelWrapper>
			</Channel>
		</Root>
	);
};

export default Conversation;
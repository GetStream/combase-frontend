import React from 'react';
import styled from 'styled-components';
import { Channel, MessageInput, useChatContext } from 'stream-chat-react';

import Avatar from '@combase.app/ui/Avatar';
import Box from '@combase.app/ui/Box';
import ChannelHeaderSimple from '@combase.app/ui/ChannelHeaderSimple';
import DateSeparator from '@combase.app/ui/DateSeparator';
import MessageInputSimple from '@combase.app/ui/MessageInputSimple';
import MessageList from '@combase.app/ui/MessageList';
import MessageSimple from '@combase.app/ui/MessageSimple';
import {ScrollContextProvider} from '@combase.app/ui/contexts/Scrollbars';
import SystemMessage from '@combase.app/ui/SystemMessage';

const Root  = styled(Box)`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-rows: minmax(0, 1fr);
	grid-template-columns: 1fr ${({ drawer }) => (drawer ? `minmax(20%, 20rem)` : '')};
	
	input, textarea {
		margin: 0;
		outline: 0;
		border: 0;
	}

	& > div, .str-chat__container {
		height: 100%;
	}

	& .str-chat-channel {
		height: 100%;
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

const ConversationScreen = () => {
    const { setActiveChannel } = useChatContext();
	
    return (
        <ScrollContextProvider type="px">
			<Root>
				<Channel
					Avatar={Avatar}
					DateSeparator={DateSeparator}
					Message={MessageSimple}
					MessageSystem={SystemMessage}
					Input={MessageInputSimple}
				>
					<ChannelWrapper>
						<ChannelHeaderSimple onBackClick={() => setActiveChannel(null)} />
						<MessageList shouldGroupByUser />
						<MessageInput grow />
					</ChannelWrapper>
				</Channel>
			</Root>
		</ScrollContextProvider>
    );
};

export default ConversationScreen;

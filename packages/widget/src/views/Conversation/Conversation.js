import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-react';
import { 
	Avatar,
	Box,
	Button,
	ChannelHeaderSimple,
	MessageInputSimple,
	MessageSimple,
	ScrollContextProvider,
	Text
} from '@combase.app/ui';

const Root  = styled(Box)`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr ${({ drawer }) => (drawer ? `minmax(20%, 20rem)` : '')};
	
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
    const { channel, setActiveChannel } = useChatContext();

    const renderItem = useCallback(index => <MessageSimple index={index} />, []);

    return (
        <ScrollContextProvider type="px">
			<Root>
				<Channel
					Avatar={Avatar}
				>
					<ChannelWrapper>
						<MessageList shouldGroupByUser />
						<MessageInput grow />
					</ChannelWrapper>
				</Channel>
			</Root>
		</ScrollContextProvider>
    );
};

export default ConversationScreen;

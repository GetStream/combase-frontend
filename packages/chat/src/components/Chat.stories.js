import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useEffectOnce } from 'react-use';
import { StreamChat } from 'stream-chat';
import { 
	ChannelHeaderSimple, 
	MessageSimple, 
	MessageInputSimple, 
	ScrollContextProvider, 
	Message, 
	ChannelHeader, 
	MessageInput 
} from '@combase.app/ui';

import { Channel } from '../contexts/channel/provider';
import { ChannelManager } from '../contexts/channelManager/provider';
import { ChatProvider } from '../contexts/client/provider';

import { MessageList } from './MessageList';

const Wrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
	grid-auto-columns: 100%;
`;

const client = new StreamChat(process.env.STORYBOOK_STREAM_KEY);

export const Widget = () => {
	const [connected, setConnected] = useState();

	const connect = useCallback(async () => {
		await client.connectUser({ id: process.env.STORYBOOK_TEST_USER }, process.env.STORYBOOK_TEST_USER_TOKEN);
	}, []);

	useEffectOnce(() => {
		connect().then(() => setConnected(true));
	});

	const channel = useMemo(() => connected ? client.channel('combase', process.env.STORYBOOK_TEST_CHANNEL) : undefined, [connected]);

	const renderItem = useCallback(index => <MessageSimple index={index} />, []);

	if (!channel) {
		return false;
	}

	return (
		<ChatProvider client={client}>
			<ChannelManager>
				<Wrapper>
					<Channel channel={channel}>
						<ChannelHeaderSimple />
						<MessageList renderItem={renderItem} />
						<MessageInputSimple placeholder="Type a message" />
					</Channel>
				</Wrapper>
			</ChannelManager>
		</ChatProvider>
	);
};

export const Dashboard = () => {
	const [connected, setConnected] = useState();

	const connect = useCallback(async () => {
		await client.connectUser({ id: process.env.STORYBOOK_TEST_USER }, process.env.STORYBOOK_TEST_USER_TOKEN);
	}, []);

	useEffectOnce(() => {
		connect().then(() => setConnected(true));
	});

	const channel = useMemo(() => connected ? client.channel('combase', process.env.STORYBOOK_TEST_CHANNEL) : undefined, [connected]);

	const renderItem = useCallback(index => <Message index={index} />, []);

	if (!channel) {
		return false;
	}

	return (
		<ChatProvider client={client}>
			<ChannelManager>
				<Wrapper>
					<Channel channel={channel}>
						<ChannelHeader />
						<MessageList renderItem={renderItem} />
						<MessageInput placeholder="Type a message" />
					</Channel>
				</Wrapper>
			</ChannelManager>
		</ChatProvider>
	);
};

export default {
	component: Widget,
	decorators: [Story => (
		<ScrollContextProvider type="px">
			<Story />
		</ScrollContextProvider>
	)],
	title: 'chat/FullConversation',
}
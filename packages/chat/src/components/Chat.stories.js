import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useEffectOnce } from 'react-use';
import { StreamChat } from 'stream-chat';
import { ChannelHeaderSimple, MessageSimple, MessageInputSimple } from '@combase.app/ui';

import { Channel } from '../contexts/channel/provider';
import { ChannelManager } from '../contexts/channelManager/provider';
import { ChatProvider } from '../contexts/client/provider';

import { MessageList } from './MessageList';

const Wrapper = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
	grid-auto-columns: 100vw;
`;

const client = new StreamChat(process.env.STORYBOOK_STREAM_KEY);

export const Widget = () => {
	const [connected, setConnected] = useState();

	const connect = useCallback(async () => {
		await client.connectUser({ id: process.env.STORYBOOK_TEST_USER }, process.env.STORYBOOK_TEST_USER_TOKEN);
	}, []);

	console.log(client);
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

export default {
	component: Widget,
	title: 'chat/FullConversation',
}
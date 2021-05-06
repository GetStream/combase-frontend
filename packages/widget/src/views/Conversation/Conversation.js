import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { Channel, MessageList, useChatClient } from '@combase.app/chat';
import { ChannelHeaderSimple, MessageInputSimple, MessageSimple, ScrollContextProvider } from '@combase.app/ui';

const Root = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 100%;
`;

const ConversationScreen = () => {
    const client = useChatClient();
    const { channelID } = useParams();
    const history = useHistory();

    const renderItem = useCallback(index => <MessageSimple index={index} />, []);

    const channel = useMemo(() => client.channel('combase', channelID), [channelID]);

    if (!channel) return null;

    return (
        <ScrollContextProvider type="px">
			<Root>
				<Channel channel={channel}>
					<ChannelHeaderSimple onBackClick={history.goBack} />
					{channel?.state?.messages ? <MessageList renderItem={renderItem} /> : null}
					<MessageInputSimple placeholder="Type a message" />
				</Channel>
			</Root>
		</ScrollContextProvider>
    );
};

export default ConversationScreen;

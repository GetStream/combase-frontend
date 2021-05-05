import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { Box, EmptyView, LoadingScreen, Message, MessageInput, ScrollContextProvider } from '@combase.app/ui';
import { useChatClient, Channel, MessageList } from '@combase.app/chat';

import ConversationHeader from 'components/ConversationHeader';
import { useReactiveMedia } from 'hooks';

import DetailDrawer from './DetailDrawer';

const Root = styled(Box)`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr ${({ drawer }) => (drawer ? `minmax(20%, 20rem)` : '')};
`;

const Wrapper = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
`;

const Conversation = ({ match, readonly, showBackBtn }) => {
	const [drawerOpen, toggleDrawer] = useToggle(false);
	const history = useHistory();
	const { channelId } = useParams();

    const client = useChatClient();
    const isSm = useReactiveMedia('sm');

    const channel = useMemo(() => client.channel('combase', channelId), [client, channelId]);

    const renderItem = useCallback(index => <Message index={index} />, []);

    if (!channel && channelId) {
        return <LoadingScreen />;
    }

	if (!channel && !channelId) {
		return <EmptyView />
	}

    return (
        <ScrollContextProvider type="px">
            <Root drawer={drawerOpen}>
				<Wrapper>
					<Channel channel={channel} key={channelId}>
						<ConversationHeader
							baseUrl={match?.url}
							onBackClick={() => history.goBack()}
							readonly={readonly}
							onInfoClick={toggleDrawer}
							showBackBtn={showBackBtn || match.isExact && !isSm?.matches}
						/>
						<MessageList renderItem={renderItem} />
						{!readonly ? <MessageInput placeholder="Type a message" /> : null}
					</Channel>
				</Wrapper>
				{drawerOpen ? <DetailDrawer onClose={toggleDrawer} /> : null}
			</Root>
        </ScrollContextProvider>
    );
};

Conversation.propTypes = {
	/**
	 * React Route match, checks for isExact to show back btn on mobile screens.
	 */
	match: PropTypes.shape({
		isExact: PropTypes.bool,
	}),
	/**
	 * Hide the Composer and lock off other chat interactions so the messages can be read and moderated, but not manipulated.
	 */
	readonly: PropTypes.bool,
	/**
	 * Force the back button to show in the ChannelHeader
	 */
	showBackBtn: PropTypes.bool,
}

export default Conversation;

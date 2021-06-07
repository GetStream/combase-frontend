import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { 
	ChannelList,
	useChatContext,
} from 'stream-chat-react';
import { useHistory, useParams } from 'react-router-dom';
import { 
	Box, 
	ChannelPreview,
	ConversationsIcon, 
	PageHeader, 
	Menu, 
	ScrollbarsWithContext, 
	StateDisplay 
} from '@combase.app/ui';

import ChannelListHeader from './ChannelListHeader';
import CombaseChannelList from './CombaseChannelList';
import InboxSelector from './InboxSelector';

const Root = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
`;

const InboxMenu = () => (
    <Box>
        <PageHeader showOrganization title="Conversations" />
        <Menu paddingX={[1, 1, 2]}>
            <InboxSelector />
        </Menu>
    </Box>
);

const EmptyState = (props) => {
	return <StateDisplay icon={ConversationsIcon} size={8} text="No Conversations" />
}

const ConversationMenu = () => {
	const { client, setActiveChannel } = useChatContext();
	const history = useHistory();
	const { channelId, inbox } = useParams();

	const [status, setStatus] = useState('open');

	useEffect(() => {
		setActiveChannel(null);
		history.push(`/dashboard/conversations/${inbox}`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inbox, status]);

	const filters = useMemo(() => {
        let filter = {};

        if (status === 'queued') {
            filter = {
				...filter,
				$or: [
					{ status: 'unassigned' },
					{ status: 'new' },
				]
			}
        } else {
			//? TODO: If admin, show all?
			filter.status = status ?? undefined;
			filter.members = {
				$in: [client.userID]
			}
		}

        if (inbox === 'archive') {
            filter.status = 'archived';
        }

		// TODO Star & Priority Filters (ChannelSearch)

        return filter;
    }, [inbox, status, client]);

	const removeChannelFromList = useCallback((setChannels, updated) => {
		setChannels(prev => {
			return prev.filter(({ id }) => updated.channel_id !== id);
		});
	}, []);

	const onChannelUpdated = useCallback((setChannels, updated) => {
		if (status === 'queued') {
			if (updated.channel.status === 'open' || updated.channel.status === 'closed') {
				// If status is queued and the updated channel is no longer unassigned,
				// remove it from the list of channels.
				removeChannelFromList(setChannels, updated);
			}
		}

		if (status === 'open') {
			if (updated.channel.status !== 'open') {
				removeChannelFromList(setChannels, updated);
			}
		}
		
		if (status === 'closed') {
			if (updated.channel.status !== 'closed') {
				removeChannelFromList(setChannels, updated);
			}
		}
	}, [removeChannelFromList, status]);
	
    return (
        <Root>
			<ScrollbarsWithContext>
				<ChannelListHeader 
					inbox={inbox} 
					status={status}
					onChangeStatus={setStatus}
				/>
				<ChannelList 
					allowNewMessagesFromUnfilteredChannels={false}
					setActiveChannelOnMount={false}
					customActiveChannel={channelId}
					filters={filters}
					onChannelUpdated={onChannelUpdated}
					EmptyStateIndicator={EmptyState}
					List={CombaseChannelList}
					Preview={ChannelPreview}
				/>
			</ScrollbarsWithContext>
        </Root>
    );
};

export default ConversationMenu;

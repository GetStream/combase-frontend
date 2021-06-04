import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { 
	ChannelList,
	useChatContext,
} from 'stream-chat-react';
import { useParams } from 'react-router-dom';
import { 
	Box, 
	ChannelPreview,
	ConversationsIcon, 
	PageHeader, 
	Menu, 
	ScrollbarsWithContext, 
	StateDisplay 
} from '@combase.app/ui';

import { useReactiveMedia } from 'hooks';

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
	const { client } = useChatContext();
	const { inbox } = useParams();

	const [status, setStatus] = useState('open');

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

    return (
        <Root>
			<ScrollbarsWithContext>
				<ChannelListHeader 
					inbox={inbox} 
					status={status}
					onChangeStatus={setStatus}
				/>
				<ChannelList 
					filters={filters}
					EmptyStateIndicator={EmptyState}
					List={CombaseChannelList}
					Preview={ChannelPreview}
				/>
			</ScrollbarsWithContext>
        </Root>
    );
};

export default ConversationMenu;

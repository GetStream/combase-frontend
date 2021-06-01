import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { 
	ChannelList, 
	useChatContext
} from 'stream-chat-react';
import { useParams } from 'react-router-dom';
import { Box, ConversationsIcon, PageHeader, Menu, ScrollbarsWithContext, StateDisplay } from '@combase.app/ui';

import { useReactiveMedia } from 'hooks';

import ChannelListHeader from './ChannelListHeader';
import CombaseChannelList from './CombaseChannelList';
import CombaseChannelPreview from './CombaseChannelPreview';
import InboxSelector from './InboxSelector';

const Root = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        grid-template-columns: 0.75fr 1fr;
    }
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
	const chat = useChatContext();
	console.log(chat);
	return <StateDisplay icon={ConversationsIcon} size={8} text="No Conversations" />
}

const ConversationMenu = () => {
    const isXl = useReactiveMedia('xl');
	const { inbox } = useParams();

	const [status, setStatus] = useState('open');

	const filters = useMemo(() => {
        let filter = {};

        if (inbox === 'inbox' || inbox === 'starred' || inbox === 'priority') {
            filter.status = status ?? undefined;
        }

        if (inbox === 'unassigned') {
            filter = {
				...filter,
				$or: [
					{ status: 'unassigned' },
					{ status: 'new' },
				]
			}
        }

        if (inbox === 'archived') {
            filter.status = 'archived';
        }

        if (inbox === 'starred') {
            filter[inbox] = true;
        }

        if (inbox === 'priority') {
            filter[inbox] = {
                $gt: 0,
            };
        }

        return filter;
    }, [inbox, status]);

    return (
        <Root>
            {isXl?.matches ? <InboxMenu /> : null}
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
					Preview={CombaseChannelPreview}
				/>
			</ScrollbarsWithContext>
        </Root>
    );
};

export default ConversationMenu;

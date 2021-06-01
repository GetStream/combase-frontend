import React, { useState } from 'react';
import styled from 'styled-components';
import { 
	ChannelList, 
} from 'stream-chat-react';
import { useParams } from 'react-router-dom';
import { Box, PageHeader, Menu, ScrollbarsWithContext } from '@combase.app/ui';
import {Scrollbars} from 'rc-scrollbars';

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

const ConversationMenu = () => {
    const isXl = useReactiveMedia('xl');
	const { inbox } = useParams();

	const [status, setStatus] = useState('open');
	console.log(isXl?.matches);
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
					List={CombaseChannelList}
					Preview={CombaseChannelPreview}
				/>
			</ScrollbarsWithContext>
        </Root>
    );
};

export default ConversationMenu;

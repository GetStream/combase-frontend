import styled from 'styled-components';
import { Box, Menu, PageHeader } from '@combase.app/ui';

import { useReactiveMedia } from 'hooks';

import ChannelList from './ChannelList';
import InboxSelector from './InboxSelector';

const Root = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;

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

    return (
        <Root>
            {isXl?.matches ? <InboxMenu /> : null}
            <ChannelList />
        </Root>
    );
};

export default ConversationMenu;

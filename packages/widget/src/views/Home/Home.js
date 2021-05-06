import styled from 'styled-components';
import { Box, Card, ScrollbarsWithContext } from '@combase.app/ui';

import Header from './Header';
import RecentConversations from './RecentConversations';
import KnowledgeBase from './KnowledgeBase';

const Root = styled(Box)``;

const Widgets = styled(Box)`
	${Card} + ${Card} {
		margin-top: 1rem;
	}
`;

const Home = () => {
    return (
        <Root>
            <ScrollbarsWithContext>
                <Header />
                <Widgets paddingX={3} paddingBottom={3}>
                    <RecentConversations />
                    <KnowledgeBase />
                </Widgets>
            </ScrollbarsWithContext>
        </Root>
    );
};

export default Home;

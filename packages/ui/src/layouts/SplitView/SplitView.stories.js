import styled, { useTheme } from 'styled-components';
import { Link, MemoryRouter, useHistory } from 'react-router-dom';
import { useMedia } from 'react-use';

import Box from '../../Box';
import Container from '../../Container';
import HeaderBase from '../../HeaderBase';
import { Text } from '../../Text';
import { useScrollbars, ScrollContextProvider, ScrollbarsWithContext } from '../../contexts';
import { Button, IconButton } from '../../Buttons';
import { SplitView } from './SplitView';
import { ActivityIcon, ArrowBackIcon } from '../../icons';
import { VirtualizedList } from '../../Lists';
import PageHeader from '../../PageHeader';
import PageTitle from '../../PageTitle';

const Wrapper = styled(Box)`
    height: 100vh;
    overflow: hidden;
`;

const FeedWrapper = styled(Box)`
    position: relative;
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
`;

export const Dashboard = () => {
    const history = useHistory();
    const theme = useTheme();
    const isSm = useMedia(`(min-width: ${theme.breakpoints[1]})`);
    const scrollbars = useScrollbars();

    return (
        <SplitView columnTemplate="3.5fr 1.5fr">
            <ScrollbarsWithContext exact path="/" type="px">
                <PageHeader
                    title="Dashboard"
                    subtitle="Combase"
                    actions={[<IconButton color="primary" as={Link} to="/feed" onClick={history.goBack} icon={ActivityIcon} />]}
                />
                <div style={{ minHeight: '200vh' }} />
            </ScrollbarsWithContext>
            <ScrollContextProvider path="/feed" type="px">
                <FeedWrapper>
                    <HeaderBase>
                        {!isSm ? <IconButton onClick={history.goBack} icon={ArrowBackIcon} /> : null}
                        <PageTitle subtitle="Activity" title="Today" />
                    </HeaderBase>
                    <VirtualizedList itemContent={() => <p>Test</p>} totalCount={400} path="/feed" />
                </FeedWrapper>
            </ScrollContextProvider>
        </SplitView>
    );
};

export const Conversations = () => {
    const history = useHistory();
    const theme = useTheme();
    const isSm = useMedia(`(min-width: ${theme.breakpoints[1]})`);

    return (
        <SplitView>
            <Container exact path="/">
                <HeaderBase>
                    <PageTitle title="Dashboard" subtitle="GetStream.io" />
                </HeaderBase>
                <Button as={Link} to="/feed">
                    <Text>Feed</Text>
                </Button>
            </Container>
            <Box path="/feed">
                <HeaderBase>
                    {!isSm ? <IconButton onClick={history.goBack} icon={ArrowBackIcon} /> : null}
                    <PageTitle subtitle="Activity" title="Today" />
                </HeaderBase>
            </Box>
        </SplitView>
    );
};

const initialEntries = ['/'];
const initialIndex = 0;

export default {
    components: SplitView,
    decorators: [
        Story => (
            <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
                <Wrapper>
                    <Story />
                </Wrapper>
            </MemoryRouter>
        ),
    ],
    title: 'Layouts/SplitView',
};

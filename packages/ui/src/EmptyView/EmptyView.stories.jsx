
import Container from '../Container';
import Text from '../Text';
import Spinner from '../Spinner';
import { ChatsIcon } from '../icons';

import EmptyView from '.';

export const Default = () => (
    <Container>
        <EmptyView icon={<ChatsIcon size={10} color="altText" fillAlpha={.64} />} minHeight={14} title="No Tickets">
            <Text color="altText" opacity={0.64} fontSize={3} lineHeight={5}>
                You're tickets will appear here when you start interacting with customers.
            </Text>
        </EmptyView>
    </Container>
);

export const LoadingScreen = () => (
    <Container>
        <EmptyView backgroundColor="transparent" icon={<Spinner size={6} />} title="" />
    </Container>
);

export default {
    component: EmptyView,
    title: 'Feedback/EmptyView',
};

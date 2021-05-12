import Container from '../../Container';
import Text from '../../Text';
import { Spinner } from '../../Feedback';
import { ConversationsIcon } from '../../icons';

import EmptyView from '.';

export const Default = () => (
    <Container>
        <EmptyView icon={<ConversationsIcon size={10} color="altTextA.64" />} minHeight={14} title="No Tickets">
            <Text color="altText" fontSize={3} lineHeight={5}>
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

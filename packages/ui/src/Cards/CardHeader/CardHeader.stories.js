import styled from 'styled-components';

import { AddIcon, TagIcon } from '../../icons';
import { Container } from '../../Layout';

import {Card} from '../Card';
import CardHeader from './CardHeader';

const Root = styled(Container)`
    max-width: 16rem;

    & ${Card} {
        min-height: 20rem;
    }
`;

export const Default = () => (
    <Root>
        <Card boxShadow={4}>
            <CardHeader action={AddIcon} actionLabel="Add Tag" icon={TagIcon}>
                Tags
            </CardHeader>
        </Card>
    </Root>
);

export default {
    component: Default,
    title: 'Cards/CardHeader',
};

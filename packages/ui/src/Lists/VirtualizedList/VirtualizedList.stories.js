import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { MemoryRouter } from 'react-router-dom';
import { itemGap, shadow } from '@combase.app/styles';
import { gql } from '@combase.app/apollo';

import { useScrollbars, ScrollContextProvider } from '../../contexts/Scrollbars';

import Avatar from '../../Avatar';
import { IconButton, Button } from '../../Buttons';
import { AddUsersIcon, DropdownIcon, FilterIcon, GridViewIcon, ListViewIcon } from '../../icons';
import { Checkbox } from '../../Inputs';
import IconLabel from '../../IconLabel';
import Label from '../../Label';
import Box from '../../Box';
import PageHeader from '../../PageHeader';
import PageTitle from '../../PageTitle';
import { Text } from '../../Text';
import ToggleGroup, { ToggleGroupOption } from '../../ToggleGroup';
import { Tooltip } from '../../Popovers';

import { VirtualizedList } from '.';
import { ListItem } from '../ListItem';
import { Entity } from '../Entity';
import { EntityList } from '../EntityList';
import { useBulkSelect } from '../../hooks/useBulkSelect';
import { AgentGridItem } from '../AgentGridItem';
import { AgentListItem } from '../AgentListItem';

const Root = styled(Box)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
})`
    ${shadow.boxShadow};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    width: 35rem;
    max-width: calc(100% - 4rem);
    height: 40rem;
    overflow: hidden;
    resize: horizontal;
`;

const Labels = styled(Box)`
    & * + * {
        ${itemGap};
    }
`;

const Header = styled(Box).attrs({
    as: animated.div,
})`
    display: flex;
    align-items: center;
    & > * + * {
        ${itemGap};
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        ${itemGap};
    }
`;

const ItemContainer = props => <Box {...props} paddingX={1} />;
const dummyItems = new Array(100).fill({}).map((_, i) => ({ node: { _id: i } })); // TODO: Replace this janky mock data
export const Default = () => {
    const [listItemProps, bulkCheckboxProps] = useBulkSelect(dummyItems);
    const { anim } = useScrollbars();

    const style = useMemo(
        () => ({
            boxShadow: anim.value
                .to({
                    output: [0, 0.1],
                    range: [0, 32],
                    extrapolate: 'clamp',
                })
                .to(a => `0px 0px 12px -2px rgba(0, 0, 0, ${a})`),
        }),
        []
    );

    return (
        <Root backgroundColor="background">
            <Card borderRadius={4} boxShadow={6}>
                <Header as={animated.div} backgroundColor="surface" gapLeft={2} paddingX={5} paddingY={5} style={style}>
                    <Checkbox {...bulkCheckboxProps} />
                    <PageTitle title="Tickets" />
                </Header>
                <VirtualizedList
                    ItemContainer={ItemContainer}
                    overscan={500}
                    renderItem={i => (
                        <ListItem columnTemplate="max-content 1fr max-content max-content" {...listItemProps} value={i}>
                            <Entity icon={<Avatar name="Luke" size={4} />}>
                                <Text fontSize={3} fontWeight="600" lineHeight={3}>
                                    {'Luke'}
                                </Text>
                            </Entity>
                            <Text fontSize={2} lineHeight={3} opacity={0.56} variant="clamped">
                                {
                                    'Hi, my payment is failing when I try and upgrade the plan through my payment is failing when I try and upgrade the plan through my payment is failing when I try and upgrade the plan through'
                                }
                            </Text>
                            <Labels gapLeft={2}>
                                <Label color="teal">
                                    <Text variant="label">{'React'}</Text>
                                </Label>
                                <Label color="purple">
                                    <Text variant="label">{'Sales'}</Text>
                                </Label>
                            </Labels>
                            <Text fontSize={2} lineHeight={3} paddingRight={2}>
                                {'2 days ago'}
                            </Text>
                        </ListItem>
                    )}
                    totalCount={100}
                />
            </Card>
        </Root>
    );
};

const ListRoot = styled(Box)`
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const GET_AGENTS = gql`
    query {
        entities: agents {
            edges {
                node {
                    _id
                    createdAt
                    avatar
                    name {
                        display
                        full
                    }
                    role
                }
            }
            count
        }
    }
`;

const renderItem = ({ node } = {}, additionalProps = {}) => {
    return (
        <AgentListItem
            {...additionalProps}
            avatar={node?.avatar}
            createdAt={node?.createdAt}
            name={node?.name?.display}
            _id={node?._id}
            onClick={_id => console.log(`/dashboard/agent/${node?._id}`)}
            groups={node?.groups}
            role={node?.role}
            value={node?._id}
        />
    );
};

const renderGridItem = ({ node } = {}, additionalProps = {}) => {
    return (
        <AgentGridItem
            {...additionalProps}
            avatar={node?.avatar}
            createdAt={node?.createdAt}
            name={node?.name?.display}
            _id={node?._id}
            onClick={_id => console.log(`/dashboard/agent/${node?._id}`)}
            groups={node?.groups}
            role={node?.role}
            value={node?._id}
        />
    );
};

export const EntityListExample = () => {
    const [listMode, toggleListMode] = useState('grid');

    return (
        <ListRoot style={{ height: '100vh' }}>
            <PageHeader subtitle="Combase" title="Agents">
                <Actions gapLeft={3}>
                    <Button color="primary" size="xs">
                        <IconLabel color="primary" size={2}>
                            <AddUsersIcon />
                            <Text variant="label">{'Invite Agents'}</Text>
                        </IconLabel>
                    </Button>
                    <ToggleGroup activeBackgroundColor="white" onChange={toggleListMode} value={listMode}>
                        <ToggleGroupOption value="list">
                            <Tooltip text="List">
                                <div>
                                    <ListViewIcon color={listMode === 'list' ? 'text' : undefined} size={4} />
                                </div>
                            </Tooltip>
                        </ToggleGroupOption>

                        <ToggleGroupOption value="grid">
                            <Tooltip text="Grid">
                                <div>
                                    <GridViewIcon color={listMode === 'grid' ? 'text' : undefined} size={4} />
                                </div>
                            </Tooltip>
                        </ToggleGroupOption>
                    </ToggleGroup>
                </Actions>
            </PageHeader>
            <EntityList
                selectable
                columnTemplate="1fr 1.5fr 0.5fr 1fr"
                query={GET_AGENTS}
                renderItem={listMode === 'list' ? renderItem : renderGridItem}
                mode={listMode}
            >
                <div>
                    <Tooltip text="Sort by Name">
                        <Button size="xs" variant="flat">
                            <Text>{'Name'}</Text>
                        </Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text="Sort by Group">
                        <Button size="xs" variant="flat">
                            <Text>{'Groups'}</Text>
                        </Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text="Sort by Chat Count">
                        <Button size="xs" variant="flat">
                            <Text>{'Chats'}</Text>
                        </Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip text="Newest First">
                        <Button size="xs" variant="flat">
                            <Text>{'Created'}</Text>
                            <DropdownIcon size={3} />
                        </Button>
                    </Tooltip>
                </div>
            </EntityList>
        </ListRoot>
    );
};

export default {
    component: Default,
    decorators: [
        Story => (
            <MemoryRouter>
                <ScrollContextProvider type="px">
                    <Story />
                </ScrollContextProvider>
            </MemoryRouter>
        ),
    ],
    title: 'Lists/VirtualizedList',
};

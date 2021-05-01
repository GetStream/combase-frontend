import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { itemGap } from '@combase.app/styles';

import { useBulkSelect, useEntities } from '../../hooks';
import { Button, IconButton } from '../../Buttons';
import { IconLabel } from '../../IconLabel';
import { AddUsersIcon, DeleteIcon, DropdownIcon } from '../../icons';
import { Box } from '../../Layout';
import { Label } from '../../Label';
import { Tooltip } from '../../Popovers';
import { PageHeader } from '../../PageHeader';
import { EntityList } from '../../Lists';
import { Text } from '../../Text';
import { ScrollContextProvider } from '../../contexts';

import { GroupIcon } from '../../icons/group';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
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

export const EntityListView = ({
    children,
    columnTemplate,
    headerBackground,
    mode,
    query,
    queryOpts,
    reverseTitles,
    renderItem,
    title,
    subtitle,
}) => {
    const [items, { bulkCheckboxProps, selectableItemProps, selected, loading }] = useEntities(query, queryOpts);

    const additionalItemProps = useMemo(
        () => ({
            ...selectableItemProps,
            columnTemplate,
        }),
        [columnTemplate, selectableItemProps]
    );

    const renderListItem = useCallback(i => renderItem(items?.edges?.[i], additionalItemProps), [additionalItemProps, items, renderItem]);

    return (
        <ScrollContextProvider type="px">
            <Root>
                <PageHeader backgroundColor={headerBackground} reverseTitles={reverseTitles} subtitle={subtitle} title={title}>
                    <Actions gapLeft={3}>
                        {selected?.length ? (
                            <>
                                <Tooltip text={`New Group from ${selected?.length} agents`}>
                                    <IconButton color="red" icon={GroupIcon} onClick={console.log} size={4} />
                                </Tooltip>
                                <Tooltip text={`Move ${selected?.length} Agents to group`}>
                                    <IconButton color="red" icon={GroupIcon} onClick={console.log} size={4} />
                                </Tooltip>
                                <Tooltip text={`Delete ${selected?.length} Agents`}>
                                    <IconButton color="red" icon={DeleteIcon} onClick={console.log} size={4} />
                                </Tooltip>
                                <Label color="altText">
                                    <Text variant="label">{selected?.length} selected</Text>
                                </Label>
                            </>
                        ) : null}
                        <Button color="primary" size="xs">
                            <IconLabel color="primary" size={2}>
                                <AddUsersIcon />
                                <Text variant="label">{'Invite Agents'}</Text>
                            </IconLabel>
                        </Button>
                    </Actions>
                </PageHeader>
                <EntityList
                    bulkCheckboxProps={bulkCheckboxProps}
                    columnTemplate={columnTemplate}
                    ItemContainer={ItemContainer}
                    headerBackground={headerBackground}
                    mode={mode || 'list'}
                    renderItem={renderListItem}
                    selectable
                    totalCount={items?.count}
                >
                    {children}
                </EntityList>
            </Root>
        </ScrollContextProvider>
    );
};

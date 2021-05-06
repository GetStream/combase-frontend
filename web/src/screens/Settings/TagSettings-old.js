import React, { useCallback, useState } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';
import {
    AddTagIcon,
    Button,
    Box,
    Container,
    DropdownIcon,
    DeleteIcon,
    EditTagDialog,
    EntityList,
    PageHeader,
    IconButton,
    InputDialog,
    Modal,
    ScrollContextProvider,
    Spinner,
    TableHeader,
    TagListItem,
    transformToTag,
    Text,
    Tooltip,
    useBulkSelect,
    useEntities,
} from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';
import { CREATE_TAG, GET_TAGS, REMOVE_TAGS, NEW_TAG_FRAGMENT, useMutation } from '@combase.app/apollo';
import { useToggle } from 'react-use';

const Root = styled(Box)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const Actions = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    & > * + * {
        ${itemGap};
    }
`;

const initialValues = {
    name: '',
};

export const TagManagement = ({ history }) => {
    const [showCreateModal, toggleCreateModal] = useToggle();
    const [editing, setEditTag] = useState();
    const [tags, { organization }] = useEntities(GET_TAGS);
    const [selectableItem, bulkCheckbox, selected, setSelected] = useBulkSelect(tags?.edges || [], true);

    const [handleCreateTag, { loading: creating }] = useMutation(CREATE_TAG);
    const [handleRemoveTags, { loading: removing }] = useMutation(REMOVE_TAGS);

    const handleSubmit = useCallback(
        async values => {
            try {
                const name = transformToTag(values.name);
                await handleCreateTag({
                    optimisticResponse: {
                        __typename: 'Mutation',
                        tagCreate: {
                            tag: {
                                name,
                                organization,
                                __typename: 'Tag',
                            },
                            __typename: 'CreateOneTagPayload',
                        },
                    },
                    variables: {
                        name,
                    },
                    update: (cache, { data }) => {
                        toggleCreateModal(false);
                    },
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        [history, tags, organization]
    );

    const handleRemoveMany = useCallback(async () => {
        try {
            await handleRemoveTags({
                variables: {
                    filter: {
                        _operators: {
                            _id: {
                                in: selected,
                            },
                        },
                    },
                },
                optimisticResponse: {
                    tagRemoveMany: {
                        numAffected: selected.length,
                    },
                },
                update(cache, { data }) {
                    cache.modify({
                        id: cache.identify({ _id: organization, __typename: 'Organization' }),
                        fields: {
                            tags(existing = { edges: [] }) {
                                const removeRefs = selected.forEach(_id => cache.identify({ _id, __typename: 'Tag' }));
                                removeRefs.forEach(cache.evict);

                                const newEdges = existing.edges.filter(({ node: { __ref } }) => removeRefs.includes(__ref));

                                return {
                                    ...existing,
                                    edges: newEdges,
                                };
                            },
                        },
                    });
                },
            });
            setSelected([]);
            setEditing(false);
        } catch (error) {
            console.error(error.message);
        }
    }, [organization, selected]);

    return (
        <ScrollContextProvider type="px">
            <Root>
                <PageHeader
                    actions={
                        <Actions gapLeft={3}>
                            {selected?.length ? (
                                <>
                                    <Tooltip text={`Delete ${selected?.length} Tags`}>
                                        {!removing ? (
                                            <IconButton color="altText" icon={DeleteIcon} onClick={handleRemoveMany} size={4} />
                                        ) : (
                                            <Spinner size={4} />
                                        )}
                                    </Tooltip>
                                </>
                            ) : null}
                            <Button loading={creating} size="xs" onClick={() => toggleCreateModal(true)}>
                                <AddTagIcon />
                                <Text>New Tag</Text>
                            </Button>
                        </Actions>
                    }
                    fluid={false}
                    showOrganization
                    title="Tag Management"
                />
                <Container gutter={false}>
                    <EntityList
                        data={tags?.edges}
                        selectable
                        renderItem={(_, { node: tag } = {}) => (
                            <TagListItem
                                columnTemplate="3fr 0.75fr 0.75fr"
                                selectable={selectableItem.selectable}
                                isSelected={selectableItem.isSelected}
                                onSelect={selectableItem.onSelect}
                                onClick={() => setEditTag(tag)}
                                value={tag?._id}
                                name={tag?.name}
                            />
                        )}
                        subtitle="Stream"
                        title="Agent tags"
                    >
                        <TableHeader
                            backgroundColor="surface"
                            columnTemplate="3fr 0.75fr 0.75fr"
                            indeterminate={bulkCheckbox.indeterminate}
                            onBulkSelect={bulkCheckbox.onChange}
                            checked={bulkCheckbox.value}
                            selectable
                        >
                            <div />
                            <div>
                                <Tooltip text="Sort by Members">
                                    <Button size="xs" variant="flat">
                                        <Text>{'Members'}</Text>
                                        <DropdownIcon size={3} />
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
                        </TableHeader>
                    </EntityList>
                    <Modal
                        backdrop
                        component={InputDialog}
                        initialValues={initialValues}
                        label="New tag"
                        placeholder="Name"
                        name="name"
                        onClose={() => toggleCreateModal(false)}
                        onSubmit={handleSubmit}
                        open={showCreateModal}
                    />
                    <Modal backdrop component={EditTagDialog} initialValues={editing} onClose={() => setEditTag(false)} open={editing} />
                </Container>
            </Root>
        </ScrollContextProvider>
    );
};

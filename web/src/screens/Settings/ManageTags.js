import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CREATE_TAG, GET_TAGS, REMOVE_TAGS, NEW_TAG_FRAGMENT, useMutation } from '@combase.app/apollo';
import { useToggle } from 'react-use';
import { useHistory } from 'react-router-dom';

import {
    Box,
    EntityList,
    TableHeader,
    TagListItem,
    transformToTag,
    useBulkSelect,
    useEntities,
} from '@combase.app/ui';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ItemContainer = props => <Box {...props} paddingX={1} />;

const ManageTags = () => {
	const history = useHistory();

    const [showCreateModal, toggleCreateModal] = useToggle();
    const [editing, setEditTag] = useState();
    const [tags, { loading, organization }] = useEntities(GET_TAGS);
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
            setEditTag(false);
        } catch (error) {
            console.error(error.message);
        }
    }, [organization, selected]);

    return (
        <Root>
			<TableHeader
				columnTemplate="1fr 1.5fr 0.5fr 1fr"
				indeterminate={bulkCheckbox.indeterminate}
				onBulkSelect={bulkCheckbox.onChange}
				checked={bulkCheckbox.value}
				selectable
			/>
			<EntityList
				data={tags?.edges}
				selectable
				loading={loading}
				ItemContainer={ItemContainer}
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
			/>
		</Root>
    );
};

export default ManageTags;

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { GET_TAGS, REMOVE_TAGS, NEW_TAG_FRAGMENT, useMutation } from '@combase.app/apollo';

import {
    Box,
    EntityList,
    TableHeader,
    TagListItem,
    useBulkSelect,
    useEntities,
} from '@combase.app/ui';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ItemContainer = props => <Box {...props} paddingX={1} />;

const ManageTags = () => {
    const [tags, { loading, organization }] = useEntities(GET_TAGS);
    const [selectableItem, bulkCheckbox, selected, setSelected] = useBulkSelect(tags?.edges || [], true);

    const [handleRemoveTags] = useMutation(REMOVE_TAGS);

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
        } catch (error) {
            console.error(error.message);
        }
    }, [handleRemoveTags, organization, setSelected, selected]);

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
						value={tag?._id}
						name={tag?.name}
					/>
				)}
			/>
		</Root>
    );
};

export default ManageTags;

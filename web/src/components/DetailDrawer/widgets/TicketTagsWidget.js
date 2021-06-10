import React from 'react';
import styled from 'styled-components';
import { Chip, ChipInputBase, CloseCircleIcon, TagIcon, transformToTag } from '@combase.app/ui';
import DrawerWidgetBase from './DrawerWidgetBase';

const Input = styled(ChipInputBase)`
    padding: 0 !important;
	min-height: ${({ theme }) => theme.sizes[5]};

    &::placeholder {
        color: ${({ theme }) => theme.colors.altText};
    }
`;

const tags = [{ node: { name: 'test' } }, { node: { name: 'tags' } }]

const renderChip = ({ node = {} }, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
        backgroundColor="textA.8"
        color="text"
        icon={TagIcon}
        key={node?.name}
        label={node?.name}
        marginBottom={1}
        marginRight={1}
        marginTop={1}
        onActionClick={() => actions.removeAt(i)}
        selected={i === cursor}
    />
);

const TicketTagsWidget = () => {
	return (
		<DrawerWidgetBase title="Tags">
			<Input
				transformValue={transformToTag}
				placeholder="+ Add Tags"
				renderChip={renderChip}
				// onAddChip={onAddTag}
				// onRemoveChip={onRemoveTag}
				value={tags || []}
			/>
		</DrawerWidgetBase>
	);
};

export default TicketTagsWidget;
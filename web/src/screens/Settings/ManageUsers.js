import React from 'react';
import styled from 'styled-components';
import { GET_AGENTS } from '@combase.app/apollo';

import { Box, TableHeader, Text, PageHeader, useBulkSelect, useEntities } from '@combase.app/ui';

import AgentListItem from 'components/AgentListItem';
import EntityList from 'components/EntityList';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ItemContainer = props => <Box {...props} paddingX={1} />;

const ManageUsers = () => {
    const [agents, { loading }] = useEntities(GET_AGENTS);
	const [selectableItem, bulkCheckbox] = useBulkSelect(agents?.edges || [], true);

    return (
        <Root>
			<PageHeader backgroundColor="surface" title="Agents">
			<TableHeader
				columnTemplate="1fr 1fr"
				indeterminate={bulkCheckbox.indeterminate}
				onBulkSelect={bulkCheckbox.onChange}
				checked={bulkCheckbox.value}
				selectable
				backgroundColor="surface"
			>
				<div>
					<Text>{'Name'}</Text>
				</div>
				<div>
					<Text>{'Role'}</Text>
				</div>
			</TableHeader>
			</PageHeader>
			<EntityList
				columnTemplate="1fr 1fr"
				data={agents?.edges}
				ItemContainer={ItemContainer}
				loading={loading}
				renderItem={(_, { node: agent } = {}) => (
					<AgentListItem
						selectable={selectableItem.selectable}
						isSelected={selectableItem.isSelected}
						onSelect={selectableItem.onSelect}
						// onClick={() => history.push(`/dashboard/agents/${agent?._id}`)}
						value={agent?._id}
						ticketCount={agent?.tickets?.count}
						createdAt={agent?.createdAt}
						_id={agent?._id}
						groups={agent?.groups?.edges}
						totalGroups={agent?.groups?.count}
						avatar={agent?.avatar}
						name={agent?.name?.full}
						meta={agent?.role}
					/>
				)}
			/>
		</Root>
    );
};

export default ManageUsers;

import React from 'react';
import { Box, Button, DropdownIcon, EntityList, PageCard, PageHeader, TableHeader, TicketListItem, Tooltip, Text, useBulkSelect, useEntities } from "@combase.app/ui";
import { GET_TICKETS } from '@combase.app/apollo';

const ItemContainer = props => <Box {...props} paddingX={1} />;

const Tickets = () => {
	const [tickets] = useEntities(GET_TICKETS);

	const [selectableItem, bulkCheckbox, selected] = useBulkSelect(tickets?.edges, true);
	
	return (
		<PageCard variant="withHeader">
			<PageHeader
				showOrganization
				title="Tickets"
			>
				<TableHeader
					columnTemplate="max-content 1fr 10rem max-content max-content"
					indeterminate={bulkCheckbox.indeterminate}
					onBulkSelect={bulkCheckbox.onChange}
					checked={bulkCheckbox.value}
					selectable
				>
					<Box>
						<Text color="primary">{'User'}</Text>
					</Box>
					<Box>
					</Box>
					<Box>
						<Text>Assignee</Text>
					</Box>
					<Box>
						<Text color="primary">{'Status'}</Text>
					</Box>
					<Box>
						<Text color="primary">{'Created'}</Text>
					</Box>
				</TableHeader>
			</PageHeader>
			<EntityList
				data={tickets?.edges}
				ItemContainer={ItemContainer}
				mode="list"
				selectable
				renderItem={(_, { node: ticket } = {}) => (
					<TicketListItem
						selectable={selectableItem.selectable}
						isSelected={selectableItem.isSelected}
						onSelect={selectableItem.onSelect}
						avatar={ticket?.user?.avatar}
						name={ticket?.user?.name}
						status={ticket?.status}
						latestMessage={ticket?.latestMessage}
						updatedAt={ticket?.latestMessageAt || ticket?.updatedAt}
						value={ticket?._id}
					/>
				)}
			/>
		</PageCard>
	);
}

export default Tickets;
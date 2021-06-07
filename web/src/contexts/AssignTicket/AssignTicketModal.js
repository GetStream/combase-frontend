import React, { forwardRef, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation, ASSIGN_TICKET } from '@combase.app/apollo';
import { AssignIcon, Box, Button, Card, CardHeader, Container, ListItem, Modal, SearchToolbar, Text, VirtualizedList } from '@combase.app/ui';
import {
	InstantSearch,
	Hits,
	connectSearchBox,
  } from 'react-instantsearch-dom';
import { algolia } from 'utils/search';
import { layout } from '@combase.app/styles';

import { AgentEntity } from 'components/Entities';
import { AssignTicketContext } from './context';

const Root = styled(Card)`

`;

const List = styled(Box)`
    ${layout};
    display: grid;
    grid-template-rows: 100%;

	& ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
`;

const Footer = styled(Box).attrs({
    padding: 3,
})`
    display: flex;
	flex-direction: column;
    align-items: stretch;
`;

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
	return <SearchToolbar onChange={e => refine(e.target.value)} onClear={() => refine('')} value={currentRefinement} />
});

const AssignTicketModalInner = forwardRef((props, ref) => {
	const [toAssign, setTicketToAssign] = useContext(AssignTicketContext);
	const [assignTicket] = useMutation(ASSIGN_TICKET);
	const onClose = () => setTicketToAssign(null);

	const handleAssignTicket = useCallback(async (agent) => {
		try {
			await assignTicket({
				variables: {
					agent,
					ticket: toAssign,
					status: 'open',
				}
			});
			setTicketToAssign(null);
		} catch (error) {
			console.log(error.message);
		}
	}, [assignTicket, setTicketToAssign, toAssign]);

	const AgentResult = useCallback(({ hit }) => {
		const { email, name, objectID } = hit || {}
		return (
			<ListItem onClick={() => handleAssignTicket(objectID)}>
				<AgentEntity name={name?.full} meta={email} />
			</ListItem>
		);
	}, [handleAssignTicket]);

	return (
		<InstantSearch indexName="AGENTS" searchClient={algolia}>
			<Root ref={ref} boxShadow={8} role="dialog" width={16}>
				<CardHeader paddingX={5} icon={<AssignIcon size={5} />}>{'Assign Ticket To...'}</CardHeader>
				<Container>
					<SearchBox />
				</Container>
				<List minHeight={15} paddingX={3}>
					<Hits hitComponent={AgentResult} />
				</List>
				{/* <List minHeight={15}>
					<VirtualizedList
						ItemContainer={ItemContainer}
						loading={loading || searching}
						data={query ? results : entities?.edges}
						renderItem={(a, { node = {} } = {}) => {
							return (
								<ListItem interaction="highlight" onClick={e => handleAdd(e, node?._id)} columnTemplate="1fr min-content">
									<AgentEntity name={node.name?.display} meta={node.email} />
									{selectedAgents.includes(node?._id) ? (
										<Button onClick={e => handleRemove(e, node?._id)} variant="flat" size="xs" color="error">
											<Text variant="label">Remove</Text>
										</Button>
									) : null}
								</ListItem>
							);
						}}
					/>
				</List> */}
				<Footer>
					<Button color="error" onClick={onClose} size="xs" variant="flat">
						<Text color="error">Cancel</Text>
					</Button>
				</Footer>
			</Root>
		</InstantSearch>
	);
});

const AssignTicketModal = () => {
	const [toAssign, setTicketToAssign] = useContext(AssignTicketContext);

	const onClose = () => setTicketToAssign(null);

	return <Modal component={AssignTicketModalInner} open={toAssign} onClose={onClose} ticketId={toAssign} />;
};

export default AssignTicketModal;
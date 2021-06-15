import React, { forwardRef, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useMutation, ASSIGN_TICKET, GET_ORGANIZATION, useQuery } from '@combase.app/apollo';
import { AssignIcon, Box, Button, Card, CardHeader, Container, IconBubble, ListItem, Modal, AlgoliaSearchToolbar, Text, VirtualizedList } from '@combase.app/ui';
import {
	Configure as AlgoliaConfig,
	InstantSearch,
	connectHits,
  } from 'react-instantsearch-dom';
import { algolia } from 'utils/search';
import { layout } from '@combase.app/styles';

import { AgentEntity } from 'components/Entities';
import { AssignTicketContext } from './context';

const Root = styled(Card)`
	display: grid;
    grid-template-rows: min-content 1fr min-content;
`;

const List = styled(Box)`
    ${layout};
    display: grid;
    grid-template-rows: 100%;

	& ul {
		margin: 0;
		padding: 0;
		padding-left: ${({ theme }) => theme.space[3]};
		padding-right: ${({ theme }) => theme.space[3]};
		list-style: none;
	}
`;

const Footer = styled(Box).attrs({
    padding: 3,
})`
    display: flex;
	flex-direction: column;
    align-items: stretch;
	border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ItemContainer = styled(Box).attrs({
    paddingX: 2,
})``;

const HitList = connectHits(({ onClickHit, hits }) => {
	console.log(hits);
	return (
		<List minHeight={16}>
			<VirtualizedList
				ItemContainer={ItemContainer}
				// loading={loading || searching}
				data={hits}
				renderItem={(a, hit = {}) => {
					console.log(a, hit)
					return (
						<ListItem interaction="highlight" onClick={() => onClickHit(hit?.objectID)} columnTemplate="1fr min-content">
							<AgentEntity name={hit.name?.display} meta={hit.email} />
						</ListItem>
					);
				}}
			/>
		</List>
	)
});

const AssignTicketModalInner = forwardRef((props, ref) => {
	const [toAssign, setTicketToAssign] = useContext(AssignTicketContext);
	const { data } = useQuery(GET_ORGANIZATION);
	const [assignTicket] = useMutation(ASSIGN_TICKET);
	const onClose = () => setTicketToAssign(null);

	const organization = data?.organization || {};

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
			<Root ref={ref} boxShadow={8} role="dialog" maxHeight={18} width={17}>
				<CardHeader paddingX={5} paddingY={5} icon={<IconBubble icon={AssignIcon} size={8} />}>{'Assign Ticket to...'}</CardHeader>
				<Container>
					<AlgoliaSearchToolbar />
					<AlgoliaConfig filters={`organization:${organization._id}`} />
				</Container>
				<HitList onClickHit={handleAssignTicket} />
				{/* <List minHeight={16}>
					<Scrollbars>
						<Hits hitComponent={AgentResult} />
					</Scrollbars>
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
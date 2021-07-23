import React, { forwardRef, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import {
	Configure as AlgoliaConfig,
	InstantSearch,
	connectHits,
  } from 'react-instantsearch-dom';
import { algolia } from 'utils/search';
import { layout } from '@combase.app/styles';

import { ASSIGN_TICKET, GET_ORGANIZATION } from 'apollo/operations';

import {AssignIcon} from "@combase.app/ui/icons";
import Box from "@combase.app/ui/Box";
import Button from "@combase.app/ui/Button";
import Card from "@combase.app/ui/Card";
import CardHeader from "@combase.app/ui/CardHeader";
import Container from "@combase.app/ui/Container";
import ListItem from "@combase.app/ui/ListItem";
import Modal from "@combase.app/ui/Modal";
import {AlgoliaSearchToolbar} from "@combase.app/ui/SearchToolbar";
import Text from "@combase.app/ui/Text";

import {DialogFooter} from "components/Dialog";
import { AgentEntity } from 'components/Entities';
import { AssignTicketContext } from './context';

const Root = styled(Card)`
	display: grid;
    grid-template-rows: min-content min-content 1fr min-content;
`;

const List = styled(Box)`
    ${layout};
  	overflow-y: scroll;

	& ul {
		margin: 0;
		padding: 0;
		padding-left: ${({ theme }) => theme.space[3]};
		padding-right: ${({ theme }) => theme.space[3]};
		list-style: none;
	}
`;

const HitList = connectHits(({ onClickHit, hits }) => {
	return (
		<List height={18} paddingY="small" paddingX={1}>
			{
				hits.map((hit = {}) => {
					return (
						<ListItem
							key={hit.objectID} 
							interaction="highlight" 
							onClick={() => onClickHit(hit?.objectID)} 
							columnTemplate="1fr min-content"
						>
							<AgentEntity 
								name={hit.name?.display} 
								meta={hit.email} 
							/>
						</ListItem>
					)
				})
			}
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

	return (
		<InstantSearch indexName="AGENTS" searchClient={algolia}>
			<Root ref={ref} boxShadow={8} role="dialog" width={19}>
				<CardHeader paddingX={5} paddingY={5} icon={<AssignIcon size={5} />}>Assign Ticket</CardHeader>
				<Container>
					<AlgoliaSearchToolbar />
					<AlgoliaConfig filters={`organization:${organization._id}`} />
				</Container>
				<HitList onClickHit={handleAssignTicket} />
				<DialogFooter>
					<Button color="altText" onClick={onClose} variant="flat">
						<Text color="altText">Cancel</Text>
					</Button>
				</DialogFooter>
			</Root>
		</InstantSearch>
	);
});

const AssignTicketModal = () => {
	const [toAssign, setTicketToAssign] = useContext(AssignTicketContext);

	const onClose = () => setTicketToAssign(null);

	return <Modal component={AssignTicketModalInner} open={toAssign} onClose={onClose} />;
};

export default AssignTicketModal;
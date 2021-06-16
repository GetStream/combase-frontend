import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { connectHits, Configure as AlgoliaConfig, InstantSearch, connectSearchBox } from 'react-instantsearch-dom';
import { GET_AGENTS } from '@combase.app/apollo';
import { AddUsersIcon, AgentsIcon, Box, Button, Chip, EmptyView, IconButton, IconLabel, ListItem, Modal, MoreIcon, AlgoliaSearchToolbar, Text, useEntities } from '@combase.app/ui';

import { algolia } from 'utils/search';

import { AgentEntity } from 'components/Entities';
import InviteAgentsModal from './InviteAgentsModal';

const Toolbar = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled(Box)`
	display: flex;
	align-items: center;
`;

const connectAlgoliaProps = (wrapped) => connectSearchBox(connectHits(wrapped));

const AgentList = connectAlgoliaProps(({ agents, currentRefinement, hits, ...rest }) => {
	if (currentRefinement) {
		return hits?.length ? hits.map((node) => {
			return (
				<ListItem columnTemplate="1fr min-content" key={node?.objectID}>
					<AgentEntity name={node?.name?.full} meta={node?.role} />
					<IconButton color="altText" icon={MoreIcon} />
				</ListItem>	
			)
		}) : <EmptyView icon={<AgentsIcon size={8} color="altText" fillAlpha={0.64} />} title="No Agents match your search." />
	}

	return agents?.length ? agents?.map(({ node }) => {
		return (
			<ListItem columnTemplate="1fr min-content" key={node?._id}>
				<AgentEntity name={node?.name?.full} meta={node?.role} />
				<IconButton color="altText" icon={MoreIcon} />
			</ListItem>
		)
	}) : <EmptyView icon={<AgentsIcon size={8} color="altText" fillAlpha={0.64} />} title="No Agents." />
});

const ListHeader = connectAlgoliaProps(({ agentCount, currentRefinement, hits }) => {
	const [openInviteAgents, toggleInviteAgents] = useToggle();
	const count = (currentRefinement ? hits?.length : agentCount) || 0;
	return (
		<Toolbar minHeight={9}>
			<Title>
				<Text fontSize={5} lineHeight={7}>Agents</Text>
				<Chip marginLeft={3} color="text" variant="ghost" size="sm" label={count} />
			</Title>
			<Button color="altText" variant="flat" size="xs" onClick={() => toggleInviteAgents()}>
				<IconLabel>
					<AddUsersIcon />
					<Text>
						Invite Agents
					</Text>
				</IconLabel>
			</Button>
			<Modal component={InviteAgentsModal} open={openInviteAgents} onClose={() => toggleInviteAgents(false)} />
		</Toolbar>
	);
});

const OrganizationAgentsSettings = () => {
	const [agents, { organization }] = useEntities(GET_AGENTS);
	return (
		<InstantSearch indexName="AGENTS" searchClient={algolia}>
			<AlgoliaConfig filters={`organization:${organization}`} />
			<Box>
				<ListHeader agentCount={agents?.count} />
				<AlgoliaSearchToolbar />
				<AgentList agents={agents?.edges} />
			</Box>
		</InstantSearch>
	);
};

export default OrganizationAgentsSettings;
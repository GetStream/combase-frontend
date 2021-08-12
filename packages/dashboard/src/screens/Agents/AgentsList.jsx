import React, { useState } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'rc-scrollbars';

import {
	Configure as AlgoliaConfig,
	InstantSearch,
	connectHits,
	connectSearchBox,
} from 'react-instantsearch-dom';

import { algolia } from 'utils/search';

import Box from "@combase.app/ui/Box";
import Button from "@combase.app/ui/Button";
import Container from '@combase.app/ui/Container';
import EmptyView from '@combase.app/ui/EmptyView';
import IconLabel from "@combase.app/ui/IconLabel";
import { AddUsersIcon, AgentsIcon } from "@combase.app/ui/icons";
import Modal from "@combase.app/ui/Modal";
import {AlgoliaSearchToolbar} from "@combase.app/ui/SearchToolbar";
import Text from "@combase.app/ui/Text";

import HeaderBase from 'components/HeaderBase';
import InviteAgentsDialog from 'components/InviteAgentsDialog';
import AgentItem from 'components/AgentItem';

import useAgents from 'hooks/useAgents';
import useCurrentUser from 'hooks/useCurrentUser';

const Root = styled(Box)`
	display: grid;
	grid-template-rows: 1fr;
	& .rc-scrollbars-view {
		display: grid;
		grid-template-rows: min-content min-content 1fr;
	}
`;

const Header = styled(HeaderBase)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: none;
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.colors.background};
	z-index: 1;
`;

const SearchWrapper = styled(Container)`
	display: flex;
	align-items: flex-start;
`;

const algoliaListProps = (Component) => connectSearchBox(connectHits(Component))

const List = algoliaListProps(({ currentRefinement, agents, hits }) => {
	if (currentRefinement && !hits.length) {
		return (
			<Container>
				<EmptyView minHeight={19} title="No agents match your search." />
			</Container>
		)
	}
	
	if (!agents?.edges.length) {
		return (
			<Container>
				<EmptyView minHeight={19} title="No agents." />
			</Container>
		)
	}

	return (
		<Container paddingX={1} paddingBottom={6}>
			{
				currentRefinement ? 
					hits.map(({ access, active, objectID, name, email }) => (
						<AgentItem
							_id={objectID} 
							access={access}
							active={active}
							meta={email}
							name={name.display}
						/>
					)) 
					: agents.edges.map(({ node: agent }) => (
						<AgentItem
							_id={agent?._id} 
							avatar={agent?.avatar}
							access={agent?.access}
							active={agent?.active}
							meta={agent?.email} 
							name={agent?.name.display} 
						/>
					)
				)
			}
		</Container>
	)
});

const AgentsList = () => {
	const [openInvitationModal, toggleInvitationModal] = useState();
	const {data: currentUser} = useCurrentUser();
	const {data} = useAgents();
	const access = currentUser?.me?.access;
	const organization = data?.organization;
	const agents = data?.organization.agents;

	return (
		<InstantSearch indexName="AGENTS" searchClient={algolia}>
			<Root>
				<Scrollbars>
					<Header>
						<IconLabel gap={2}>
							<AgentsIcon color="primary" size={6} />
							<Text fontSize={5} fontWeight={600} lineHeight={7}>Agents</Text>
						</IconLabel>
						{
							access !== 'guest' ? (
								<Button size="xs" onClick={() => toggleInvitationModal(true)}>
									<IconLabel gap={2}>
										<Text color="white" fontWeight="600">Invite Agents</Text>
										<AddUsersIcon size={4} />
									</IconLabel>
								</Button>
							) : null
						}
					</Header>
					<SearchWrapper paddingY={2}>
						<AlgoliaSearchToolbar />
						<AlgoliaConfig filters={`organization:${organization?._id}`} />
					</SearchWrapper>
					<List agents={agents} />
				</Scrollbars>
				<Modal component={InviteAgentsDialog} open={openInvitationModal} onClose={() => toggleInvitationModal(false)} />
			</Root>
		</InstantSearch>
	);
};

export default AgentsList;
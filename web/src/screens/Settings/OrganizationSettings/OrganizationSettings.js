import React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { Route } from 'react-router-dom';
import { Scrollbars } from 'rc-scrollbars';
import { GET_ORGANIZATION_PROFILE, useQuery } from '@combase.app/apollo';
import { AddUsersIcon, Avatar, Box, Container, EditIcon, Modal, PageHeader, MenuItem, Text, TextGroup, TextInput, RoleIcon } from '@combase.app/ui';
import OrganizationAgentsSettings from './OrganizationAgentsSettings';
import EditOrganizationModal from './EditOrganizationModal';
import AddTagModal from './AddTagModal';
import OrganizationTagsSettings from './OrganizationTagsSettings';
import OrganizationQuickResponsesSettings from './OrganizationQuickResponsesSettings';

const Root = styled(Box)`
	display: grid;
	grid-template-rows: min-content 1fr;
	height: 100%;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: ${({ theme }) => theme.sizes[16]} 1fr;
	grid-gap: ${({ theme }) => theme.space[4]};
`;

const OrganizationCol = styled(Box)`
	& > ${Box} {
		position: sticky;
		top: 0;		
	}
`;

const OrganizationSettings = ({ children }) => {
	const [showModal, toggleModal] = useToggle();
	const { data } = useQuery(GET_ORGANIZATION_PROFILE);
	const organization = data?.organization;

	return (
		<Root>
			<PageHeader hideTitle goBack />
			<Scrollbars>
				<Wrapper maxWidth={21}>
					<OrganizationCol>
						<Box>
							<Box paddingX={2}>
								<Avatar name={organization?.name} src={organization?.branding.logo} size={13} />
								<TextGroup paddingY={5}>
									<Text fontSize={6} lineHeight={7} fontWeight="600">{organization?.name}</Text>
									<Text color="altText">{organization?.agents.count} agents</Text>
								</TextGroup>
							</Box>
							<MenuItem icon={EditIcon} label="Edit Organization" color="altText" onClick={toggleModal} />
							<Modal component={EditOrganizationModal} onClose={() => toggleModal(false)} open={showModal} />
						</Box>
					</OrganizationCol>
					<Box paddingBottom={8}>
						<Route path="/dashboard/settings/organization/agents" component={OrganizationAgentsSettings} />
						<Route path="/dashboard/settings/organization/tags" component={OrganizationTagsSettings} />
						<Route path="/dashboard/settings/organization/quick-responses" component={OrganizationQuickResponsesSettings} />
						<Route path="/dashboard/settings/organization/tags/new" exact>
							{
								({ history, match }) => <Modal component={AddTagModal} open={match} onClose={history.goBack} />
							}
						</Route>
					</Box>
				</Wrapper>
			</Scrollbars>
		</Root>
	);
};

export default OrganizationSettings;
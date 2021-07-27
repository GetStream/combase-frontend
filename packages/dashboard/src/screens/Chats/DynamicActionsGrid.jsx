import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { interactions } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import EmptyView from '@combase.app/ui/EmptyView';
import { ZendeskIcon } from '@combase.app/ui/icons';
import IconBubble from '@combase.app/ui/IconBubble';
import Text from '@combase.app/ui/Text';

import { GET_TICKET_DRAWER_ACTIONS } from 'apollo/operations';

const Grid = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: ${({theme}) => theme.space[1]};
`;

const ActionItem = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	user-select: none;
	cursor: pointer;
	${interactions};
`;

const queryOpts = { fetchPolicy: "cache-and-network" };
const DynamicActionsGrid = () => {
	const { data } = useQuery(GET_TICKET_DRAWER_ACTIONS, queryOpts);

	const activeIntegrations = data?.organization?.integrations?.edges;
	const integrationActions = useMemo(() => activeIntegrations?.filter?.(({ node: { parentDefinition }}) => !!parentDefinition?.actions?.length)?.flatMap?.(({ node: { parentDefinition, uid } }) => parentDefinition.actions.map((action) => ({ ...action, plugin: uid }))) || [], [activeIntegrations]);

	return (
		<Box marginTop={8}>
			<Text fontSize={5} lineHeight={5} fontWeight={600}>
				Actions
			</Text>
			{integrationActions?.length ? (
				<Grid paddingY={4}>
					{
						integrationActions.map((action) => (
							<ActionItem interaction="highlight" padding={2} borderRadius={3}>
								<IconBubble size={12} icon={ZendeskIcon} />
								<Text marginTop={1} textAlign="center" fontSize={2} fontWeight="600">{action.label}</Text>
							</ActionItem>
						))
					}
				</Grid>
			) : (
				<EmptyView marginTop={4} title="No Actions Available">
					<Text color="altText">Configure integrations to add new actions.</Text>
				</EmptyView>
			)}
		</Box>
	);
};

export default DynamicActionsGrid;
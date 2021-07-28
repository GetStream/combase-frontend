import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { interactions } from '@combase.app/styles';

import Box from '@combase.app/ui/Box';
import EmptyView from '@combase.app/ui/EmptyView';
import { CheckCircleIcon, CloseCircleIcon, ZendeskIcon } from '@combase.app/ui/icons';
import IconBubble from '@combase.app/ui/IconBubble';
import Spinner from '@combase.app/ui/Spinner';
import Text from '@combase.app/ui/Text';

import { GET_TICKET_DRAWER_ACTIONS, INTEGRATION_ACTION } from 'apollo/operations';

const Grid = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: ${({theme}) => theme.space[1]};
`;

const GridItem = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	user-select: none;
	cursor: pointer;
	${interactions};
`;

const ActionItem = ({ label, trigger }) => {
	const {channelId} = useParams();
	const [success, setSuccess] = useState();
	const [error, setError] = useState();

	const [fireAction, { loading }] = useMutation(INTEGRATION_ACTION);

	const handleTriggerAction = useCallback(async () => {
		try {
			await fireAction({ 
				variables: { 
					trigger, 
					payload: {
						ticket: channelId,
					}
				} 
			});

			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} catch (error) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 3000);
		}
	}, [fireAction, label, channelId, trigger]);

	const Icon = useMemo(() => {
		if (loading) {
			return Spinner;
		} else if (error) {
			return CloseCircleIcon;
		} else if (success) {
			return CheckCircleIcon;
		} else {
			return ZendeskIcon;
		}
	}, [loading, error, success]);

	return (
		<GridItem interaction="highlight" padding={2} borderRadius={3} onClick={handleTriggerAction}>
			<IconBubble size={12} icon={Icon} />
			<Text marginTop={1} textAlign="center" fontSize={2} fontWeight="600">{label}</Text>
		</GridItem>
	);	
};

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
					{integrationActions.map((action, i) => <ActionItem label={action.label} key={i} trigger={action.trigger[0]} />)}
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
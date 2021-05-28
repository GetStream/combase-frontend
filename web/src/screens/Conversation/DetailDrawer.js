import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import {
    Avatar,
    Box,
    Chip,
	CloseCircleIcon,
    CloseIcon,
    Container,
    Heading,
    IconButton,
    ListSubheader,
    PageHeader,
	PinIcon,
    Placeholder,
	TagIcon,
    Text,
    TextGroup,
	IconLabel,
	Tooltip,
	transformToTag,
	ChipInputBase,
	MenuItem,
} from '@combase.app/ui';
import { useParams } from 'react-router-dom';
import { INTEGRATION_ACTION, useQuery, useMutation, GET_TICKET_DRAWER } from '@combase.app/apollo';
// import { ActivityFeed } from 'components/ActivityFeed';

const Root = styled(Box)`
    display: grid;
    grid-template-rows: max-content 1fr;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.surface};
	border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const Masthead = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Input = styled(ChipInputBase)`
    padding: 0 !important;

    &::placeholder {
        color: ${({ theme }) => theme.colors.altText};
    }
`;

const FeedWrapper = styled(Box)`
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
`;

const Name = styled(Heading)`
    &${Placeholder} {
        width: 6rem;
        height: 1.25rem;
    }
`;


const renderChip = ({ node = {} }, actions, i, cursor) => (
    <Chip
        action={CloseCircleIcon}
        backgroundColor="textA.8"
        color="text"
        icon={TagIcon}
        key={node?.name}
        label={node?.name}
        marginBottom={1}
        marginRight={1}
        marginTop={1}
        onActionClick={() => actions.removeAt(i)}
        selected={i === cursor}
    />
);

const DetailDrawer = ({ onClose }) => {
    const { channelId } = useParams();
    const { data } = useQuery(GET_TICKET_DRAWER, { fetchPolicy: 'cache-and-network', variables: { _id: channelId } });
	const [fireAction] = useMutation(INTEGRATION_ACTION);
	const { addToast } = useToasts();
	
   	const { tags, user } = data?.organization?.ticket || {};
    const activeIntegrations = data?.organization?.integrations?.edges;

	const integrationActions = useMemo(() => activeIntegrations?.filter?.(({ node: { parentDefinition }}) => !!parentDefinition?.actions?.length)?.flatMap?.(({ node: { parentDefinition, uid } }) => parentDefinition.actions.map((action) => ({ ...action, plugin: uid }))) || [], [activeIntegrations]);

	const handleTriggerAction = useCallback(async (action) => {
		try {
			const { label, trigger: [trigger], payload } = action;
			
			await fireAction({ 
				variables: { 
					trigger, 
					payload: {
						ticket: channelId,
					}
				} 
			});

			addToast(`"${label}" fired.`, {
				appearance: 'success',
				autoDismiss: true,
			});
		} catch (error) {
			console.error(error.message);
		}
	}, [addToast, fireAction, channelId]);

    return (
        <Root>
            <Box>
                <PageHeader
					backgroundColor="text"
					hideTitle
                    actions={[<IconButton color="altText" icon={CloseIcon} onClick={onClose} />]}
                />
                <Masthead variant="fluid">
					<Avatar src={user?.avatar} name={user?.name} size={12} />
                    <TextGroup marginY={3} variant='centered'>
                        <Name as={!user?.name ? Placeholder : undefined} fontSize={6} fontWeight="600" lineHeight={6}>
                            {user?.name}
                        </Name>
						<Text color="altText" fontSize={3} lineHeight={4} marginBottom={2}>
                            {user?.email}
                        </Text>
                        {user?.timezone ? (
							<Tooltip text="10:00am • Wed 5 May">
								<IconLabel color="primary">
									<PinIcon />
									<Text>
										Boulder, CO
									</Text>
								</IconLabel>
							</Tooltip>
						) : (
							<Text color="altText" opacity={0.5}>No timezone data available for this user</Text>
						)}
                    </TextGroup>
                </Masthead>
				<Container marginY={6}>
					<ListSubheader>Tags</ListSubheader>
					<Input
                        transformValue={transformToTag}
                        placeholder="+ Add Tags"
                        renderChip={renderChip}
                        // onAddChip={onAddTag}
                        // onRemoveChip={onRemoveTag}
                        value={tags || []}
                    />
				</Container>
				{
					integrationActions?.length ? (
						<Container marginY={6}>
							<ListSubheader>Actions</ListSubheader>
							{integrationActions.map((action) => <MenuItem icon={Avatar} iconProps={{ name: action.plugin }} label={action.label} onClick={() => handleTriggerAction(action)} />)}
						</Container>
					) : null
				}
            </Box>
            <FeedWrapper>
                {/* <ActivityFeed headerBackground="surface" feed={`ticket:${channelId}`} subtitle="Powered by Stream" title="Ticket Activity" /> */}
            </FeedWrapper>
        </Root>
    );
};

export default DetailDrawer;

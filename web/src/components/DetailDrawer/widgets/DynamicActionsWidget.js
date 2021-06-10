import React,  {useCallback, useMemo} from 'react';
import { GET_TICKET_DRAWER_ACTIONS, INTEGRATION_ACTION, useMutation, useQuery } from '@combase.app/apollo';
import { Avatar, MenuItem } from '@combase.app/ui';
import { useToasts } from 'react-toast-notifications';
import { useChatContext } from 'stream-chat-react';

import DrawerWidgetBase from './DrawerWidgetBase';

const DynamicActionsWidget = () => {
	const { addToast } = useToasts();
	const { channel } = useChatContext();
	const channelId = channel?.id;

	const { data } = useQuery(GET_TICKET_DRAWER_ACTIONS);
	const [fireAction] = useMutation(INTEGRATION_ACTION);

	const activeIntegrations = data?.organization?.integrations?.edges;
	const integrationActions = useMemo(() => activeIntegrations?.filter?.(({ node: { parentDefinition }}) => !!parentDefinition?.actions?.length)?.flatMap?.(({ node: { parentDefinition, uid } }) => parentDefinition.actions.map((action) => ({ ...action, plugin: uid }))) || [], [activeIntegrations]);

	const handleTriggerAction = useCallback(async (action) => {
		try {
			const { label, trigger: [trigger] } = action;
			
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

	if (!integrationActions?.length) {
		return null;
	}

	return (
		<DrawerWidgetBase infoText="Fire actions from your active integrations" title="Dynamic Actions">
			{
				integrationActions.map((action) => <MenuItem icon={Avatar} iconProps={{ name: action.plugin }} label={action.label} onClick={() => handleTriggerAction(action)} />)
			}
		</DrawerWidgetBase>
	);
};

export default DynamicActionsWidget;
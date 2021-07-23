import React, { Children, cloneElement, useCallback, useMemo } from 'react';
import { useMessageContext, MESSAGE_ACTIONS, useChannelActionContext } from 'stream-chat-react';

import Dropdown from '../Dropdown';
import { EditIcon, DeleteIcon, ReplyIcon } from '../icons';
import MenuItem from '../MenuItem';
import Popover, { usePopoverState } from '../Popover';

const MessageActions = (props) => {
	const {
		getMessageActions: propGetMessageActions,
		handleDelete: propHandleDelete,
		// handleFlag: propHandleFlag,
		// handleMute: propHandleMute,
		// handlePin: propHandlePin,
		message: propMessage,
	} = props;

	const {
		getMessageActions: contextGetMessageActions,
		handleDelete: contextHandleDelete,
		// handleFlag: contextHandleFlag,
		// handleMute: contextHandleMute,
		// handlePin: contextHandlePin,
		message: contextMessage,
    	setEditingState,
	} = useMessageContext();

	const { setQuotedMessage } = useChannelActionContext();

	const [anchorRef, { open: actionsMenuOpen, toggle: toggleActionsMenu }] = usePopoverState();
	
	const getMessageActions = propGetMessageActions || contextGetMessageActions;
	const handleDelete = propHandleDelete || contextHandleDelete;
	const message = propMessage || contextMessage;

	const messageActions = useMemo(() => getMessageActions(), [getMessageActions]);

	const handleClose = useCallback(() => toggleActionsMenu(false), []);

	const handleClick = (event) => {
		event.stopPropagation();
		toggleActionsMenu(true);
	};

	const handleQuote = () => {
		setQuotedMessage(message);

		const elements = document.getElementsByClassName('str-chat__textarea__textarea');
		const textarea = elements.item(0);

		if (textarea instanceof HTMLTextAreaElement) {
			textarea.focus();
		}
		toggleActionsMenu(false);
	};
	
	if (!messageActions?.length) {
		return null;
	}

	return (
		<>
			{
				cloneElement(Children.only(props.children), {
					onClick: handleClick,
					ref: anchorRef,
				})
			}
			<Popover 
				as={Dropdown} 
				anchor={anchorRef.current} 
				open={actionsMenuOpen} 
				onClose={handleClose}
				placement="bottom-end"
			>
				{
					messageActions.indexOf(MESSAGE_ACTIONS.quote) > -1 &&
					!message.parent_id &&
					!message.quoted_message ?
						<MenuItem icon={ReplyIcon} label="Reply" onClick={handleQuote} />
					: null
				}
				{
					messageActions.indexOf(MESSAGE_ACTIONS.edit) > -1 ? 
						<MenuItem icon={EditIcon} label="Edit" onClick={() => {
							setEditingState(true);
							toggleActionsMenu(false);
						}} />
					: null
				}
				{
					messageActions.indexOf(MESSAGE_ACTIONS.delete) > -1 ? 
						<MenuItem icon={DeleteIcon} label="Delete" onClick={(e) => {
							handleDelete(e);
							toggleActionsMenu(false);
						}} />
					: null
				}
			</Popover>
		</>
	);
};

export default MessageActions;
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useMessageContext } from 'stream-chat-react';
import { interactions } from '@combase.app/styles';

import Box from '../../Box';
import ButtonBase from '../../ButtonBase';
import {
	DeleteIcon,
	EditIcon,
	EmojiIcon,
	MoreIcon,
} from '../../icons';

const Root = styled(Box)`
	display: none;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: ${({ theme }) => theme.space[2]};
	position: absolute;
	top: -${({ theme }) => theme.sizes[6]};
	right: ${({ theme }) => theme.space[3]};
	border: 1px solid ${({ theme }) => theme.colors.border};

	*:hover > & {
		display: grid;
	}
`;

const IconWrapper = styled(ButtonBase).attrs(({ icon: Icon, iconColor }) => ({
	children: <Icon size={4} color={iconColor || "altText"} />
}))`
	${interactions};
	display: flex;
	align-items: center;
	justify-content: center;
`

const MessageActions = () => {
	const {
		clearEditingState,
		editing,
		handleDelete,
		isMyMessage,
		getMessageActions,
		setEditingState,
	} = useMessageContext();
	const isOwned = isMyMessage();

	const messageActions = useMemo(() => getMessageActions(), [getMessageActions]);

	return (
		<Root backgroundColor="surface" borderRadius={5} boxShadow={0} paddingY={1} paddingX={2}>
			{isOwned ? <IconWrapper icon={EditIcon} minHeight={6} minWidth={6} interaction="opacity" onClick={editing ? clearEditingState : setEditingState} />  : null}
			<IconWrapper icon={DeleteIcon} onClick={(_, e) => handleDelete(e)} iconColor="red" minHeight={6} minWidth={6} interaction="opacity" />
			{!isOwned ? <IconWrapper icon={MoreIcon} iconColor="altText" minHeight={6} minWidth={6} interaction="opacity" /> : null}
		</Root>
	);
};

export default MessageActions;
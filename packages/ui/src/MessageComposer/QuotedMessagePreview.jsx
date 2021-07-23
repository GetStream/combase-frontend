import React from 'react';
import styled from 'styled-components';
import { useComponentContext, useMessageContext, useChannelActionContext } from 'stream-chat-react';

import Box from '../Box';
import { CloseCircleIcon } from '../icons';
import IconButton from '../IconButton';
import IconLabel from '../IconLabel';
import Text from '../Text';
import Tooltip from '../Tooltip';

const Root = styled(Text).attrs({ as: "blockquote" })`
	position: relative;
	margin: 0;
	padding-left: ${({ theme }) => theme.space[6]};
	padding-right: ${({ theme }) => theme.space[6]};
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: ${({ theme })=> theme.sizes[1]};
		background-color: ${({ theme }) => theme.colors.border};
		border-radius: 99px;
	}
`;

const CancelButton = styled(IconButton)`
	position: absolute;
	top: ${({theme}) => theme.space[1]};
	right: ${({theme}) => theme.space[1]};
`;

const QuotedMessagePreview = (props) => {
	const { quotedMessage } = props;

	const { setQuotedMessage } = useChannelActionContext();
	const { Avatar, Attachment } = useComponentContext();
 	const { isMyMessage, message } = useMessageContext();

	if (!quotedMessage) return null;

	const quotedMessageText =
		quotedMessage.i18n?.[`${userLanguage}_text`] ||
		quotedMessage.text;

	const quotedMessageAttachment = quotedMessage.attachments.length
	?
		quotedMessage.attachments[0]
	: null;

	if (!quotedMessageText && !quotedMessageAttachment) return null;


	return (
		<Box paddingY={2}>
			<Root>
				<Text color="altText" fontWeight={400}>Replying to:</Text>
				{quotedMessageAttachment && <Attachment attachments={[quotedMessageAttachment]} />}
				<Text fontSize="15px" lineHeight={6} fontWeight={400}>
					{quotedMessageText}
				</Text>
				<IconLabel gap={2} paddingY={2}>
					<Avatar 
						variant={null} 
						size={5}
						borderRadius={1} 
						src={quotedMessage.user.image} 
						name={quotedMessage.user.name} 
					/>
					<Text>{quotedMessage.user.name}</Text>
				</IconLabel>
				<Tooltip text="Cancel Reply" placement="left">
					<CancelButton color="altText" icon={CloseCircleIcon} onClick={() => setQuotedMessage(null)} />
				</Tooltip>
			</Root>
		</Box>
	);
};

export default QuotedMessagePreview;
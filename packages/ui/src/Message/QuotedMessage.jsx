import React from 'react';
import styled from 'styled-components';
import { useComponentContext, useMessageContext } from 'stream-chat-react';

import Box from '../Box';
import IconLabel from '../IconLabel';
import Text from '../Text';

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

const QuotedMessage = () => {
	const { Avatar, Attachment } = useComponentContext();
 	const { isMyMessage, message } = useMessageContext();

	const { quoted_message } = message;
	if (!quoted_message) return null;

	const quotedMessageText =
		quoted_message.i18n?.[`${userLanguage}_text`] ||
		quoted_message.text;

	const quotedMessageAttachment = quoted_message.attachments.length
	?
		quoted_message.attachments[0]
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
						src={quoted_message.user.image} 
						name={quoted_message.user.name} 
					/>
					<Text>{quoted_message.user.name}</Text>
				</IconLabel>
			</Root>
		</Box>
	);
};

export default QuotedMessage;
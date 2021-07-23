import React from 'react';
import styled from 'styled-components';
import {
	ChatAutoComplete,
	useChannelStateContext,
} from 'stream-chat-react';

import Box from '../Box';
import Container from '../Container';

import QuotedMessagePreview from './QuotedMessagePreview';
import ComposerToolbar from './ComposerToolbar'

const Root = styled(Container).attrs({
    paddingTop: [3, 3, 5],
    paddingBottom: [3, 3, 5],
	maxWidth: 21
})`
    min-height: 3.5rem;
    background: transparent;
`;

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
	paddingX: [3, 3, 4]
})`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.colors.border};
    min-width: 0;

	& textarea {
		background: transparent;
		padding-top: ${({ theme }) => theme.space[3]};
		width: 100%;
		resize: none;
		color: ${({ theme }) => theme.colors.text};
		font-family: ${({ theme }) => theme.fonts.text};
		font-size: ${({ theme }) => theme.fontSizes[3]};
		line-height: ${({ theme }) => theme.fontSizes[5]};
	}
`;

const MessageComposer = ({ children, editMode }) => {
	const { quotedMessage } = useChannelStateContext();
	
	return (
		<Root paddingX={editMode ? 0 : undefined}>
			<Card>
				{quotedMessage && <QuotedMessagePreview quotedMessage={quotedMessage} />}
				{children}
				<ChatAutoComplete />
				<ComposerToolbar editMode={editMode} />
			</Card>
   		</Root>
	);
}

export default MessageComposer;
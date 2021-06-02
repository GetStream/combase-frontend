import React from 'react';
import styled from 'styled-components';
import { FileUploadButton, ImageDropzone } from 'react-file-utils';
import {
	ChatAutoComplete,
} from 'stream-chat-react';
import { Box, Container } from '@combase.app/ui'; 

import ComposerToolbar from '../ComposerToolbar'

const Root = styled(Box).attrs({
    paddingTop: [3],
    paddingBottom: [3],
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
    transition: 0.3s height ${({ theme }) => theme};

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

const EditMessageComposer = (props) => {
	return (
		<Root>
			<Card>
				<ChatAutoComplete />
				<ComposerToolbar editMode />
			</Card>
   		</Root>
	);
}

export default EditMessageComposer;
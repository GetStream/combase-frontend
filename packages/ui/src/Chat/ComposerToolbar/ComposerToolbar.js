import React from 'react';
import styled from 'styled-components';
import { useChannelStateContext, useMessageInputContext, UploadsPreview } from 'stream-chat-react';
import { FileUploadButton } from 'react-file-utils';
import { itemGap } from '@combase.app/styles';

import Box from '../../Box';
import IconButton from '../../IconButton';
import {
	AttachmentIcon,
	KnowledgeBaseIcon,
	QuickResponseIcon,
	TransferIcon,
	ReturnIcon,
	SendIcon
} from '../../icons';
import Tooltip from '../../Tooltip';

const Wrapper = styled(Box)`
	.rfu-image-previewer {
		display: flex;
		flex: 1 1 100%;
		margin-top: ${({ theme }) => theme.space[4]};
	}

	.rfu-image-previewer__image {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: ${({ theme }) => theme.sizes[12]} !important;
		height: ${({ theme }) => theme.sizes[12]} !important;
		margin-right: ${({ theme }) => theme.space[2]};
		margin-bottom: ${({ theme }) => theme.space[2]};

		& .rfu-thumbnail__wrapper {
			width: ${({ theme }) => theme.sizes[12]} !important;
			height: ${({ theme }) => theme.sizes[12]} !important;
			position: absolute;
			border-radius: ${({ theme }) => theme.radii[3]};
			overflow: hidden;
		}
	}

	.rfu-image-previewer .rfu-thumbnail-placeholder {
		width: ${({ theme }) => theme.sizes[12]} !important;
		height: ${({ theme }) => theme.sizes[12]} !important;
		border-radius: ${({ theme }) => theme.radii[3]};
	}

	.rfu-thumbnail__image {
		width: inherit;
		height: inherit;
		object-fit: cover;
	}

	.rfu-image-previewer__image .rfu-thumbnail__wrapper .rfu-thumbnail__overlay, .rfu-image-previewer__image .rfu-thumbnail__wrapper .rfu-icon-button {
		padding: 0;
	}

	.rfu-thumbnail__overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.4);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: ${({ theme }) => theme.space.small};
	}

	.rfu-icon-button {
		cursor: pointer;
		position: relative;
		padding: ${({ theme }) => theme.space.small};
		align-items: center;
		justify-content: center;
	}

	.rfu-image-previewer__retry {
		z-index: 90;
	}

	.rfu-image-upload-button {
		cursor: pointer;

		& label {
			cursor: pointer;
		}

		& .rfu-image-input {
			width: 0;
			height: 0;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			z-index: -1;
		}

		& svg {
			fill: ${({ theme }) => theme.colors.altText};
		}
	}

	.rfu-thumbnail-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: ${({ theme }) => theme.sizes[12]};
		height: ${({ theme }) => theme.sizes[12]};
		border: 1px dashed ${({ theme }) => theme.colors.altText};
		border-radius: ${({ theme }) => theme.radii[1]};
		cursor: pointer;
	}
`;

const Root = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

	& input[type="file"] {
		display: none;
	}
`;

const ActionGroup = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * + * {
        ${itemGap}
    }
`;

const ReturnPrompt = styled(props => <ReturnIcon {...props} $color="altText" />)`
    width: 1rem;
    height: 1rem;
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    transform: translate3d(${({ $show }) => ($show ? -0.25 : 0)}rem, 0rem, 0rem);
    transition: 240ms all ${({ theme }) => theme.ease};
`;

const ComposerToolbar = ({ editMode, disabled }) => {
	const {
		clearEditingState,
		closeEmojiPicker,
		cooldownRemaining,
		emojiPickerIsOpen,
		handleEmojiKeyDown,
		handleSubmit,
		isUploadEnabled,
		maxFilesLeft,
		openEmojiPicker,
		uploadNewFiles,
		text
	} = useMessageInputContext();

	const { acceptedFiles, multipleUploads } = useChannelStateContext();

	const openFileDialog = () => document.querySelector('.rfu-file-input').click();

	return (
		<Wrapper>
			<UploadsPreview />
			<Root marginTop={4} paddingBottom={4}>
				{
					!editMode ? (
						<ActionGroup gapLeft={3}>
							<FileUploadButton
								accepts={acceptedFiles}
								disabled={maxFilesLeft === 0}
								handleFiles={uploadNewFiles}
								multiple={multipleUploads}
							>
								<Tooltip text="Add Attachment" placement="top">
									<IconButton color="altText" fillAlpha={0.56} icon={AttachmentIcon} onClick={openFileDialog} size={4} />
								</Tooltip>
							</FileUploadButton>
							<Tooltip text="Transfer Ticket" placement="top">
								<IconButton color="altText" fillAlpha={0.56} icon={TransferIcon} size={4} />
							</Tooltip>
							<Tooltip text="Quick Responses" placement="top">
								<IconButton color="altText" fillAlpha={0.56} icon={QuickResponseIcon} size={4} />
							</Tooltip>
							{/* <Tooltip text="Search FAQ" placement="top">
								<IconButton color="altText" fillAlpha={0.56} icon={KnowledgeBaseIcon} size={4} />
							</Tooltip> */}
						</ActionGroup>
					) : (
						<ActionGroup gapLeft={3}>
							<FileUploadButton
								accepts={acceptedFiles}
								disabled={maxFilesLeft === 0}
								handleFiles={uploadNewFiles}
								multiple={multipleUploads}
							>
								<Tooltip text="Add Attachment" placement="top">
									<IconButton color="altText" fillAlpha={0.56} icon={AttachmentIcon} onClick={openFileDialog} size={4} />
								</Tooltip>
							</FileUploadButton>
						</ActionGroup>
					)
				}
				<Box display="flex" alignItems="center">
					<ActionGroup gapLeft={3}>
						<ReturnPrompt color="altText" $show={text} size={3} />
						<IconButton color="primary" fillAlpha={!text ? 0.2 : 1} disabled={!text} icon={SendIcon} onClick={(_, e) => handleSubmit(e)} size={4} />
					</ActionGroup>
				</Box>
			</Root>
		</Wrapper>
	);
};

export default ComposerToolbar;
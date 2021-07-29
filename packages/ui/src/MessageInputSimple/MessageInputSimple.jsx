import React from 'react';
import styled from 'styled-components';
import { borderRadius, layout, space, typography } from '@combase.app/styles';
import { ChatAutoComplete, useMessageInputContext, useChannelStateContext, UploadsPreview } from 'stream-chat-react';
import { FileUploadButton } from 'react-file-utils';

import IconButton from '../IconButton';
import Box from '../Box';
import Container from '../Container';
import { AttachmentIcon, ArrowUpCircleIcon } from '../icons';

const Root = styled(Container)`
    box-shadow: 0px -2px 16px -6px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, 0.16)};
	min-width: 0;
	& input[type="file"] {
		display: none;
	}

	.rfu-image-previewer {
		display: flex;
		min-width: 0;
		flex: 1 1 100%;
		margin-top: ${({ theme }) => theme.space[4]};
	}

	.rfu-image-previewer__image {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
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

const Wrapper = styled(Container)`
    ${layout.minHeight};
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ActionButton = styled(Box)`
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
`;

const Input = styled(Box)`
    ${borderRadius};
    ${layout};
    ${typography};
    ${space};
    height: 100%;
    flex: 1 1 auto;
    resize: none;
    outline: none;
    font-family: ${({ theme }) => theme.fonts.text};
    z-index: 1;
    color: ${({ theme }) => theme.colors.text};

    background-color: ${({ $hasValue, color, theme }) => theme.utils.colors.fade(theme.colors[color], $hasValue ? 0.04 : 0.02)};

	& textarea {
		padding: ${({ theme }) => theme.space[3]};
		background: transparent;
		width: 100%;
		resize: none;
		color: ${({ theme }) => theme.colors.text};
		font-family: ${({ theme }) => theme.fonts.text};
		font-size: ${({ theme }) => theme.fontSizes[3]};
		line-height: ${({ theme }) => theme.fontSizes[5]};
	}

    &:hover,
    &:focus-within {
        background-color: ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.04)};
    }
`;

const Attachments = styled(Box)`
	overflow-x: auto;
	overflow-y: hidden;
`;

const MessageInputSimple = props => {
	const disabled = false;
	
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
        <Root backgroundColor="surface" borderTopLeftRadius={2} borderTopRightRadius={2} gutter={false} paddingY={1}>
            <Wrapper minHeight={7} paddingTop={3} paddingBottom={1}>
				<FileUploadButton
					accepts={acceptedFiles}
					disabled={maxFilesLeft === 0}
					handleFiles={uploadNewFiles}
					multiple={multipleUploads}
				>
					<IconButton disabled={!isUploadEnabled} onClick={openFileDialog} icon={AttachmentIcon} size={[5, 5, 6]} />
				</FileUploadButton>
                <Input fontFamily="text" marginX={2} borderRadius={2}>
					<ChatAutoComplete />
                </Input>
                <ActionButton marginLeft={[1, 1, 2]} paddingBottom={1}>
                    <IconButton
                        color="primary"
                        disabled={disabled}
                        icon={ArrowUpCircleIcon}
                        size={[5, 5, 6]}
                    />
                </ActionButton>
            </Wrapper>
			<Attachments paddingX={4}>
				<UploadsPreview />
			</Attachments>
        </Root>
    );
};

MessageInputSimple.defaultProps = {
    disabled: false,
    focus: false,
    maxRows: 10,
};

export default MessageInputSimple;
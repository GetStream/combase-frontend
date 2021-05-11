import React from 'react';
import styled from 'styled-components';
import prettyBytes from 'pretty-bytes';
import { interactions, layout } from '@combase.app/styles';

import { CloseIcon, FileIcon, WarningIcon } from '../icons';
import Box from '../Box';
import { IconBubble } from '../IconBubble';
import Placeholder from '../Placeholder';
import { Chip } from '../Chip';
import { Tooltip } from '../Popovers';
import { Spinner } from '../Feedback';
import { Text } from '../Text';

const Root = styled(Box)`
    ${layout};
    position: relative;
    & + & {
        margin-left: ${({ theme }) => theme.space[2]};
    }
`;

const Preview = styled(Box)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};

    & img {
        left: 0;
        top: 0;
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const State = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled(Box)`
    ${layout};
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
        ${interactions};
    }
`;

const FilePreview = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;
`;

export const AttachmentPreview = ({ fallback, mimetype, type, size, state, src, onRemove }) => (
    <Root as={type === 'image' && !src ? Placeholder : undefined} size={10}>
        <Tooltip text="Remove Attachment" placement="top">
            <CloseButton backgroundColor="black" borderRadius="circle" interaction="opacity" size={2} onClick={onRemove}>
                <CloseIcon color="white" size={2} />
            </CloseButton>
        </Tooltip>
        <Tooltip text={state === 'failed' ? 'Upload failed' : fallback}>
            <Preview borderRadius={2}>
                {type === 'image' ? (
                    <img alt="attachment" src={src} />
                ) : (
                    <FilePreview>
                        <IconBubble icon={FileIcon} size={5} />
                        <Text fontSize={2} lineHeight={3} fontWeight="700" marginTop={1}>
                            {mimetype}
                        </Text>
                        <Text fontSize={1} lineHeight={2} color="altText">
                            {prettyBytes(size)}
                        </Text>
                    </FilePreview>
                )}
                {state !== 'complete' ? (
                    <State backgroundColor={`blackA.${state === 'failed' ? 80 : 60}`}>
                        {state === 'failed' ? <WarningIcon color="warning" /> : <Spinner size={2} color="white" />}
                    </State>
                ) : null}
            </Preview>
        </Tooltip>
    </Root>
);

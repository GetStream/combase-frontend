import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
import { itemGap } from '@combase.app/styles';

import { IconButton } from '../../../Buttons';
import { AttachmentIcon, KnowledgeBaseIcon, QuickResponseIcon, TransferIcon, ReturnIcon, SendIcon } from '../../../icons';
import Box from '../../../Box';
import { AttachmentPreview } from '../../AttachmentPreview';
import { Tooltip } from '../../../Popovers';

const Root = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

const Attachments = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: row;
`;

const ComposerToolbar = ({ disabled }) => {
    const attachmentInputRef = useRef();
    const editor = useSlate();
    const { serializedText: text, onSubmit } = editor;

    const attachments = useMemo(() => Object.entries(editor.attachments), [editor.attachments]);

    return (
        <>
            {attachments?.length ? (
                <Attachments paddingX={1} paddingBottom={2}>
                    {attachments?.map?.(([key, attachment]) => (
                        <AttachmentPreview
                            fallback={attachment.fallback}
                            onRemove={() => editor.removeAttachment(key)}
                            type={attachment.type}
                            state={attachment.state}
                            src={attachment.preview?.url}
                            key={key}
                            mimetype={attachment.mimetype}
                            size={attachment.size}
                        />
                    ))}
                </Attachments>
            ) : null}
            <Root marginTop={4} paddingBottom={4} contentEditable={false}>
                <input ref={attachmentInputRef} type="file" style={{ display: 'none' }} onChange={editor.onUpload} />
                <ActionGroup gapLeft={3}>
                    <Tooltip text="Add Attachment" placement="top">
                        <IconButton color="altText" icon={AttachmentIcon} size={4} onClick={() => attachmentInputRef.current.click()} />
                    </Tooltip>
                    <Tooltip text="Transfer Ticket" placement="top">
                        <IconButton color="altText" icon={TransferIcon} size={4} />
                    </Tooltip>
                    <Tooltip text="Quick Responses" placement="top">
                        <IconButton color="altText" icon={QuickResponseIcon} size={4} />
                    </Tooltip>
                    <Tooltip text="Search FAQ" placement="top">
                        <IconButton color="altText" icon={KnowledgeBaseIcon} size={4} />
                    </Tooltip>
                </ActionGroup>
                <ActionGroup gapLeft={3}>
                    <ReturnPrompt color="altText" $show={text} size={3} />
                    <IconButton color="primary" disabled={disabled} icon={SendIcon} size={4} onClick={() => onSubmit(editor)} />
                </ActionGroup>
            </Root>
        </>
    );
};

export default ComposerToolbar;

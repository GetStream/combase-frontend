import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useChannel, useChannelActions } from '@combase.app/chat';
import { borderRadius, interactions, layout, space, typography } from '@combase.app/styles';

import { useComposerAttachments, useComposerTypingEvents, useComposerCommands, CommandMenu } from '../plugins';
import { IconButton } from '../../Buttons';
import { Box, Container } from '../../Layout';
import { ListSubheader } from '../../Lists';
import { Editable, EditablePresets } from '../../Inputs';
import { AttachmentIcon, ArrowUpCircleIcon, CloseCircleIcon } from '../../icons';
import { AttachmentPreview } from '../AttachmentPreview';

const Root = styled(Container)`
    box-shadow: 0px -2px 16px -6px ${({ theme }) => theme.utils.colors.fade(theme.colors.shadow, 0.16)};
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
    background-color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.text};
    z-index: 1;
    color: ${({ theme }) => theme.colors.text};

    background-color: ${({ $hasValue, color, theme }) => theme.utils.colors.fade(theme.colors[color], $hasValue ? 0.04 : 0.02)};

    &:hover,
    &:focus-within {
        background-color: ${({ color, theme }) => theme.utils.colors.fade(theme.colors[color], 0.04)};
    }
`;

const Attachments = styled(Container)`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2rem 1fr;
    padding-top: 0;
`;

const AttachmentsHeader = styled(Box).attrs({
    interaction: 'opacity',
})`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
        cursor: pointer;
        ${interactions}
    }
`;

const AttachmentsList = styled(Box)`
    display: grid;
    grid-template-columns: repeat(${({ count }) => count}, ${({ size, theme }) => theme.sizes[size]});
`;

const emptyValue = [
    {
        children: [
            {
                text: '',
            },
        ],
        type: 'p',
    },
];

export const MessageInputSimple = props => {
    const { sendMessage } = useChannelActions();
    const channel = useChannel();
    const editorRef = useRef();
    const [value, setValue] = useState(emptyValue);

    const {
        plugin: AttachmentsPlugin,
        state: { attachments },
    } = useComposerAttachments();

    const { plugin: TypingEventsPlugin } = useComposerTypingEvents();

    const handleSubmit = useCallback(async ({ attachments, serializedText: text, clearEditor }) => {
        if (!text && !attachments?.length) {
            return;
        }
        // TODO: Optimistically add message to the list with failed/retry - may as well run messages through apollo but not cache them.
        clearEditor();

        await sendMessage({
            attachments: [],
            text,
        });
    }, []);

    const plugins = useMemo(() => [...EditablePresets.Chat.plugins, AttachmentsPlugin, TypingEventsPlugin], []);
    const text = value[0].children[0].text || '';
    const disabled = props.disabled || !text;

    return (
        <Root backgroundColor="surface" borderTopLeftRadius={2} borderTopRightRadius={2} gutter={false} paddingY={1}>
            <Wrapper minHeight={7} paddingTop={1} paddingBottom={1}>
                <ActionButton marginRight={[1, 1, 2]} paddingBottom={1}>
                    <IconButton icon={AttachmentIcon} size={[4, 4, 5]} />
                </ActionButton>
                <Input fontFamily="text" marginX={2} borderRadius={2} maxRows={props.maxRows}>
                    <Editable
                        components={EditablePresets.Chat.components}
                        plugins={plugins}
                        onChange={setValue}
                        onSubmit={handleSubmit}
                        disabled={disabled}
                        onFocus={props.onFocus}
                        placeholder={props.placeholder}
                        ref={editorRef}
                        rows={1}
                        value={value}
                    >
                        {/* <CommandMenu at={target} onClickCommand={onSelectCommand} options={options} valueIndex={index} /> */}
                    </Editable>
                </Input>
                <ActionButton marginLeft={[1, 1, 2]} paddingBottom={1}>
                    <IconButton
                        color="primary"
                        disabled={disabled}
                        icon={ArrowUpCircleIcon}
                        onClick={editorRef.current?.onSubmit}
                        size={[4, 4, 5]}
                    />
                </ActionButton>
            </Wrapper>
        </Root>
    );
};

MessageInputSimple.defaultProps = {
    disabled: false,
    focus: false,
    maxRows: 10,
};

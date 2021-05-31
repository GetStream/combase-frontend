import React, { useCallback, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useChannel, useChannelActions } from '@combase.app/chat';
import { emojiIndex } from 'emoji-mart';
import { Transforms } from 'slate';

import Box from '../../Box';
import Container from '../../Container';
import { Editable, EditablePresets } from '../../Inputs';

import { useComposerAttachments, useComposerTypingEvents, useComposerCommands, CommandMenu } from '../plugins';
import ComposerToolbar from './ComposerToolbar';
import EmojiSuggestions from './EmojiSuggestions';

const Root = styled(Container).attrs({
    paddingTop: [3, 3, 5],
    paddingBottom: [3, 3, 5],
})`
    min-height: 3.5rem;
    background: transparent;
`;

const Card = styled(Box).attrs({
    backgroundColor: 'surface',
    borderRadius: 3,
})`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.colors.border};
    min-width: 0;
    transition: 0.3s height ${({ theme }) => theme};
`;

const Input = styled(Editable)`
    padding: 1rem;
    border: 0;
    resize: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fontFamily};
`;

const TriggerRow = styled.div`
    display: block;
    overflow: hidden;
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

export const MessageInput = props => {
    // const messageInput = useMessageInput(props);
    const editorRef = useRef();
    const {
        plugin: AttachmentsPlugin,
        state: { attachments },
    } = useComposerAttachments();
    const { plugin: TypingEventsPlugin } = useComposerTypingEvents();

    const [value, setValue] = useState(emptyValue);

    const { sendMessage } = useChannelActions();
    const channel = useChannel();

    const onSelectCommand = useCallback((editor, data, targetRange) => {
        if (data.args) {
            setTimeout(() => {
                Transforms.select(editor, targetRange);
                Transforms.delete(editor);
                Transforms.insertText(editor, `/${data.name} `);
            }, 10);
        } else {
            setTimeout(() => {
                editor.clearEditor();
                sendMessage({
                    text: `/${data.name}`,
                });
            }, 10);
        }
    }, []);

    const { plugin: SlashCommandsPlugin, getCommandMenuProps, at: slashCommandEnabled } = useComposerCommands({
        onSelectItem: onSelectCommand,
        atStart: true,
        trigger: '/',
        optionSearchPattern: '(?<command>\\S*)?(?:\\s{1})?(?<args>\\S*)*',
        options: channel?.getConfig?.()?.commands || [],
        optionFilter: match => c => c.name?.includes?.(match?.groups?.command || ''),
    });

    const onSelectEmoji = useCallback((editor, emoji, targetRange) => {
        Transforms.delete(editor, { at: editor.selection, unit: 'word', reverse: true });
        Transforms.delete(editor, { at: editor.selection, unit: 'character', reverse: true });
        Transforms.insertText(editor, emoji);
    }, []);

    const { plugin: EmojiSelectorPlugin, getCommandMenuProps: getEmojiSelectorProps, match: emojiMatch } = useComposerCommands({
        onSelectItem: onSelectEmoji,
        optionSearchPattern: '(?<emoji>[a-z]+)',
        options: match => (match ? emojiIndex.search(match.groups.emoji) || [] : null),
        trigger: ':',
    });

    const handleSubmit = useCallback(async ({ attachments, serializedText: text, clearEditor }) => {
        if (!text && !attachments?.length) {
            return;
        }
        // TODO: Optimistically add message to the list with failed/retry - may as well run messages through apollo but not cache them between conversations.
        clearEditor();

        await sendMessage({
            attachments: [],
            text,
        });
    }, []);

    const text = value[0].children[0].text || '';

    const plugins = useMemo(
        () => [...EditablePresets.Chat.plugins, TypingEventsPlugin, AttachmentsPlugin, SlashCommandsPlugin, EmojiSelectorPlugin],
        [SlashCommandsPlugin, TypingEventsPlugin]
    );

    const disabled = props.disabled || !text || slashCommandEnabled;

    return (
        <Root ref={props.rootRef} maxWidth={21} variant="contain">
            <Card>
                <Input
                    Header={<TriggerRow>{emojiMatch?.groups?.emoji ? <EmojiSuggestions {...getEmojiSelectorProps()} /> : null}</TriggerRow>}
                    attachments={attachments}
                    id="composer"
                    disabled={disabled}
                    maxRows={props.maxRows}
                    onChange={setValue}
                    onSubmit={handleSubmit}
                    onFocus={props.onFocus}
                    placeholder={props.placeholder}
                    components={EditablePresets.Chat.components}
                    plugins={plugins}
                    ref={editorRef}
                    rows={1}
                    value={value}
                >
                    <CommandMenu {...getCommandMenuProps()} />
                    <ComposerToolbar disabled={disabled} />
                </Input>
            </Card>
        </Root>
    );
};

MessageInput.defaultProps = {
    disabled: false,
    focus: false,
    maxRows: 10,
};

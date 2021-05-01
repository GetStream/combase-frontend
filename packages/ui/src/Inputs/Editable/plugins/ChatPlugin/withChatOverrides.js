import { Transforms } from 'slate';
import { serialize } from './utils';

export const withChatOverrides = options => editor => {
    const e = editor;
    const { onChange } = editor;

    e.serializeMessage = () => serialize(editor.children);

    e.clearEditor = () => {
        Transforms.delete(e, {
            at: e.selection,
            unit: 'block',
            reverse: true,
        });
    };

    e.onChange = async event => {
        e.serializedText = e.serializeMessage();
        onChange(event);
    };

    return e;
};

export const onKeyDownChatInput = () => editor => event => {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
        }

        if (!editor.selection || editor.disabled) return;

        if (editor.onSubmit) {
            editor.onSubmit(editor);
        }
    }
};

export const getMessagePreview = message => {
    if (message?.deleted_at) {
        return 'Message deleted.';
    }

    if (message?.text) {
        return message.text;
    }

    if (message?.command) {
        return `/${message.command}`;
    }

    if (message?.attachments?.length) {
        return '🏙 Attachment...';
    }

    return undefined;
};

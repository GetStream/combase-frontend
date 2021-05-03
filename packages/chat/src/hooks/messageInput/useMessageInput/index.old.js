import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { nanoid } from 'nanoid';

import { useChannel, useChannelActions } from '../../channel';

import { reducer, initialState } from './state';
import { dataTransferItemsHaveFiles, dataTransferItemsToFiles, getAttachmentTypeFromMime } from './utils';

const apiMaxNumberOfFiles = 10;

export const useMessageInput = props => {
    const { clearEditingState, focus, message, noFiles, parent, publishTypingEvent = true } = props;

    /** Channel State */
    const channel = useChannel();
    const { editMessage, sendMessage } = useChannelActions();

    /** Message Input State */
    const [state, dispatch] = useReducer(reducer, message, initialState);

    const { attachments, fileOrder, fileUploads, imageOrder, imageUploads, mentioned_users, numberOfUploads, text } = state;

    /** Refs */
    const textareaRef = useRef();
    const newCursorPosition = useRef(null);

    /** Autofocus */
    useEffect(() => {
        if (focus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [focus]);

    /** Text */
    const insertText = useCallback(
        textToInsert => {
            if (!textareaRef.current) {
                dispatch({
                    getNewText: t => t + textToInsert,
                    type: 'setText',
                });

                return;
            }

            const textareaElement = textareaRef.current;
            const { selectionStart, selectionEnd } = textareaElement;

            newCursorPosition.current = selectionStart + textToInsert.length;

            dispatch({
                getNewText: prevText => prevText.slice(0, selectionStart) + textToInsert + prevText.slice(selectionEnd),
                type: 'setText',
            });
        },
        [textareaRef, newCursorPosition]
    );

    const replaceText = useCallback((replace, replacement = '') => {
        dispatch({
            getNewText: t => t.replace(replace, replacement),
            type: 'setText',
        });
    }, []);

    const handleChange = useCallback(
        async newText => {
            dispatch({
                getNewText: () => newText,
                type: 'setText',
            });

            if (publishTypingEvent && newText && channel) {
                await channel.keystroke();
            }
        },
        [channel, publishTypingEvent]
    );

    /** Attachments */

    /** Files */
    const uploadFile = useCallback(id => {
        dispatch({
            id,
            state: 'uploading',
            type: 'setFileUpload',
        });
    }, []);

    const removeFile = useCallback(id => {
        // TODO: cancel upload if still uploading
        dispatch({
            id,
            type: 'removeFileUpload',
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (!channel) {
                return;
            }

            const upload = Object.values(fileUploads).find(fileUpload => fileUpload.state === 'uploading' && fileUpload.file);

            if (!upload) {
                return;
            }

            const { id, file } = upload;

            let response;

            try {
                response = await channel.sendFile(file);
            } catch (error) {
                console.warn(error); // eslint-disable-line no-console

                dispatch({ type: 'reduceNumberOfUploads' });

                if (!fileUploads[id]) {
                    dispatch({
                        id,
                        state: 'failed',
                        type: 'setFileUpload',
                    });
                }

                return;
            }

            /*
             * If doImageUploadRequest returns any falsy value, then don't create the upload preview.
             * This is for the case if someone wants to handle failure on app level.
             */
            if (!response) {
                removeFile(id);

                return;
            }

            dispatch({
                id,
                state: 'finished',
                type: 'setFileUpload',
                url: response.file,
            });
        })();
    }, [fileUploads, channel, removeFile]);

    /** Images */

    const removeImage = useCallback(id => {
        // TODO: cancel upload if still uploading
        dispatch({
            id,
            type: 'removeImageUpload',
        });
    }, []);

    const uploadImage = useCallback(
        async id => {
            const img = imageUploads[id];

            if (!img || !channel) {
                return;
            }

            const { file } = img;

            if (img.state !== 'uploading') {
                dispatch({
                    id,
                    state: 'uploading',
                    type: 'setImageUpload',
                });
            }

            let response;

            try {
                response = await channel.sendImage(file);
            } catch (error) {
                dispatch({ type: 'reduceNumberOfUploads' });

                if (imageUploads[id]) {
                    dispatch({
                        id,
                        state: 'failed',
                        type: 'setImageUpload',
                    });
                }

                return;
            }

            /*
             * If doImageUploadRequest returns any falsy value, then don't create the upload preview.
             * This is for the case if someone wants to handle failure on app level.
             */
            if (!response) {
                removeImage(id);

                return;
            }

            dispatch({
                id,
                state: 'finished',
                type: 'setImageUpload',
                url: response.file,
            });
        },
        [imageUploads, channel, removeImage]
    );

    useEffect(() => {
        if (FileReader) {
            const upload = Object.values(imageUploads).find(
                imageUpload => imageUpload.state === 'uploading' && Boolean(imageUpload.file) && !imageUpload.previewUri
            );

            if (upload) {
                const { id, file } = upload;
                /*
                 * TODO: Possibly use URL.createObjectURL instead. However, then we need
                 * to release the previews when not used anymore though.
                 */
                const reader = new FileReader();

                reader.addEventListener('load', event => {
                    if (typeof event.target?.result !== 'string') {
                        return;
                    }

                    dispatch({
                        id,
                        previewUri: event.target.result,
                        type: 'setImageUpload',
                    });
                });

                reader.readAsDataURL(file);
                uploadImage(id);

                return () => {
                    reader.onload = null;
                };
            }
        }

        return () => null;
    }, [imageUploads, uploadImage]);

    /*
     * Number of files that the user can still add. Should never be more than the amount allowed by the API.
     * If multipleUploads is false, we only want to allow a single upload.
     */
    const maxFilesLeft = apiMaxNumberOfFiles - numberOfUploads;

    const uploadNewFiles = useCallback(
        files => {
            Array.from(files)
                .slice(0, maxFilesLeft)
                .forEach(file => {
                    const id = nanoid();

                    if (file.type.startsWith('image/')) {
                        dispatch({
                            file,
                            id,
                            state: 'uploading',
                            type: 'setImageUpload',
                        });
                    } else if (file instanceof File && !noFiles) {
                        dispatch({
                            file,
                            id,
                            state: 'uploading',
                            type: 'setFileUpload',
                        });
                    }
                });
        },
        [maxFilesLeft, noFiles]
    );

    const onPaste = useCallback(
        e => {
            (async event => {
                // TODO: Move this handler to package with ImageDropzone
                const { items } = event.clipboardData;

                if (!dataTransferItemsHaveFiles(items)) {
                    return;
                }

                event.preventDefault();

                /*
                 * Get a promise for the plain text in case no files are
                 * found. This needs to be done here because chrome cleans
                 * up the DataTransferItems after resolving of a promise.
                 */
                let plainTextPromise;

                const plainTextItem = [...items].find(({ kind, type }) => kind === 'string' && type === 'text/plain');

                if (plainTextItem) {
                    plainTextPromise = new Promise(resolve => {
                        plainTextItem.getAsString(s => {
                            resolve(s);
                        });
                    });
                }

                const fileLikes = await dataTransferItemsToFiles(items);

                if (fileLikes.length) {
                    uploadNewFiles(fileLikes);

                    return;
                }

                // fallback to regular text paste
                if (plainTextPromise) {
                    const s = await plainTextPromise;

                    insertText(s);
                }
            })(e);
        },
        [insertText, uploadNewFiles]
    );

    /** Submit */

    const getAttachmentsFromUploads = useCallback(() => {
        const imageAttachments = imageOrder
            .map(id => imageUploads[id])
            .filter(upload => upload.state !== 'failed')
            .filter((
                { id, url },
                index,
                self // filter out duplicates based on url
            ) => self.every(upload => upload.id === id || upload.url !== url))
            .map(upload => ({
                fallback: upload.file.name,
                image_url: upload.url,
                type: 'image',
            }));

        const fileAttachments = fileOrder
            .map(id => fileUploads[id])
            .filter(upload => upload.state !== 'failed')
            .map(upload => ({
                asset_url: upload.url,
                file_size: upload.file.size,
                mime_type: upload.file.type,
                title: upload.file.name,
                type: getAttachmentTypeFromMime(upload.file.type),
            }));

        return [
            ...attachments, // from state
            ...imageAttachments,
            ...fileAttachments,
        ];
    }, [imageOrder, imageUploads, fileOrder, fileUploads, attachments]);

    const handleSubmit = useCallback(
        async event => {
            event.preventDefault();

            const trimmedMessage = text.trim();
            const isEmptyMessage =
                trimmedMessage === '' ||
                trimmedMessage === '>' ||
                trimmedMessage === '``````' ||
                trimmedMessage === '``' ||
                trimmedMessage === '**' ||
                trimmedMessage === '____' ||
                trimmedMessage === '__' ||
                trimmedMessage === '****';

            if (isEmptyMessage && numberOfUploads === 0) {
                return;
            }

            // the channel component handles the actual sending of the message
            const someAttachmentsUploading =
                Object.values(imageUploads).some(upload => upload.state === 'uploading') ||
                Object.values(fileUploads).some(upload => upload.state === 'uploading');

            if (someAttachmentsUploading) {
                // TODO: show error to user that they should wait until image is uploaded
                return;
            }

            const newAttachments = getAttachmentsFromUploads();

            /*
             * Instead of checking if a user is still mentioned every time the text changes,
             * just filter out non-mentioned users before submit, which is cheaper
             * and allows users to easily undo any accidental deletion
             */
            const actualMentionedUsers = Array.from(
                new Set(mentioned_users.filter(({ name, id }) => text.includes(`@${id}`) || text.includes(`@${name}`)).map(({ id }) => id))
            );

            const updatedMessage = {
                attachments: newAttachments,
                mentioned_users: actualMentionedUsers,
                text,
            };

            if (Boolean(message) && editMessage) {
                if (clearEditingState) {
                    clearEditingState();
                }

                await editMessage({
                    ...updatedMessage,
                    id: message.id,
                }).then(clearEditingState);
            } else if (sendMessage) {
                dispatch({ type: 'clear' });

                await sendMessage({
                    ...updatedMessage,
                    parent,
                });
            }

            if (channel && publishTypingEvent) {
                await channel.stopTyping();
            }
        },
        [
            text,
            numberOfUploads,
            imageUploads,
            fileUploads,
            getAttachmentsFromUploads,
            mentioned_users,
            message,
            editMessage,
            sendMessage,
            channel,
            publishTypingEvent,
            clearEditingState,
            parent,
        ]
    );

    useEffect(() => {
        const textareaElement = textareaRef.current;

        if (textareaElement && newCursorPosition.current !== null) {
            textareaElement.selectionStart = newCursorPosition.current;
            textareaElement.selectionEnd = newCursorPosition.current;
            newCursorPosition.current = null;
        }
    }, [newCursorPosition]);

    const commands = useMemo(() => channel?.getConfig()?.commands, [channel]);

    const isUploadEnabled = useMemo(() => channel?.getConfig?.()?.uploads !== false, [channel]);

    return {
        ...state,
        commands,
        handleChange,
        handleSubmit,
        insertText,
        isUploadEnabled,
        maxFilesLeft,
        onPaste,
        removeFile,
        removeImage,
        replaceText,
        textareaRef,
        uploadFile,
        uploadImage,
        uploadNewFiles,
    };
};

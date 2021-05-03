import { nanoid } from 'nanoid';
import { getAttachmentTypeFromMime, dataTransferItemsToFiles, dataTransferItemsHaveFiles, getImagePreview } from './utils';

const withAttachments = ({ channel, dispatch }) => editor => {
    const e = editor;
    const { insertData } = editor;

    e.removeAttachment = id =>
        dispatch({
            type: 'remove',
            id,
        });

    const handleFiles = async files => {
        /*
         * Upload files and add to the attachments in the editor.
         */
        for await (const file of files) {
            const [type] = file.type.split('/');

            const id = nanoid(6);
            let data;
            let uploader;

            if (type === 'image') {
                const preview = await getImagePreview(file);
                uploader = 'sendImage';
                data = {
                    state: 'uploading',
                    fallback: file.name,
                    thumb_url: '',
                    asset_url: '',
                    type: 'image',
                    preview,
                };
            } else {
                uploader = 'sendFile';
                data = {
                    state: 'uploading',
                    fallback: file.name,
                    thumb_url: '',
                    asset_url: '',
                    type: getAttachmentTypeFromMime(file.type),
                    mimetype: file.type,
                    size: file.size,
                };
            }

            dispatch({
                type: 'upload',
                id,
                data,
            });

            try {
                const { file: url } = await channel[uploader](file, file.name);

                dispatch({
                    type: 'complete',
                    id,
                    data: {
                        asset_url: url,
                        thumb_url: url,
                    },
                });
            } catch (error) {
                dispatch({
                    type: 'failed',
                    id,
                });
            }
        }
    };

    e.onUpload = event => {
        const {
            target: { files },
        } = event;
        return handleFiles(files);
    };

    e.insertData = async data => {
        const { items } = data;

        if (!items || !items.length) {
            return insertData(data);
        }

        if (!dataTransferItemsHaveFiles(items)) {
            insertData(data);
            return e;
        }

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

        const foundFiles = await dataTransferItemsToFiles(items);

        if (!foundFiles.length && plainTextPromise) {
            await plainTextPromise;

            insertData(data);
        } else if (foundFiles.length) {
            handleFiles(foundFiles);
        }

        return e;
    };

    return e;
};

export default withAttachments;

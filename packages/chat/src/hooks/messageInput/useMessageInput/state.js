import { nanoid } from 'nanoid';

const emptyImageUploads = {};
const emptyFileUploads = {};
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

export const reducer = (state, action) => {
    switch (action.type) {
        case 'setValue':
            return {
                ...state,
                text: action.text,
                value: action.value,
            };

        case 'clear':
            return {
                ...state,
                fileOrder: [],
                fileUploads: emptyFileUploads,
                imageOrder: [],
                imageUploads: emptyImageUploads,
                mentioned_users: [],
                numberOfUploads: 0,
                text: action.text,
                value: emptyValue,
            };

        case 'setImageUpload': {
            const imageAlreadyExists = state.imageUploads[action.id];

            if (!imageAlreadyExists && !action.file) return state;
            const imageOrder = imageAlreadyExists ? state.imageOrder : state.imageOrder.concat(action.id);
            const { type, ...newUploadFields } = action;

            return {
                ...state,
                imageOrder,
                imageUploads: state.imageUploads.setIn([action.id], {
                    ...state.imageUploads[action.id],
                    ...newUploadFields,
                }),
                numberOfUploads: imageAlreadyExists ? state.numberOfUploads : state.numberOfUploads + 1,
            };
        }

        case 'setFileUpload': {
            const fileAlreadyExists = state.fileUploads[action.id];

            if (!fileAlreadyExists && !action.file) return state;
            const fileOrder = fileAlreadyExists ? state.fileOrder : state.fileOrder.concat(action.id);
            const { type, ...newUploadFields } = action;

            return {
                ...state,
                fileOrder,
                fileUploads: state.fileUploads.setIn([action.id], {
                    ...state.fileUploads[action.id],
                    ...newUploadFields,
                }),
                numberOfUploads: fileAlreadyExists ? state.numberOfUploads : state.numberOfUploads + 1,
            };
        }

        case 'removeImageUpload':
            if (!state.imageUploads[action.id]) return state; // cannot remove anything

            return {
                ...state,
                imageOrder: state.imageOrder.filter(_id => _id !== action.id),
                imageUploads: state.imageUploads.without(action.id),
                numberOfUploads: state.numberOfUploads - 1,
            };
        case 'removeFileUpload':
            if (!state.fileUploads[action.id]) return state; // cannot remove anything

            return {
                ...state,
                fileOrder: state.fileOrder.filter(_id => _id !== action.id),
                fileUploads: state.fileUploads.without(action.id),
                numberOfUploads: state.numberOfUploads - 1,
            };
        case 'reduceNumberOfUploads': // TODO: figure out if we can just use uploadOrder instead
            return {
                ...state,
                numberOfUploads: state.numberOfUploads - 1,
            };
        case 'addMentionedUser':
            return {
                ...state,
                mentioned_users: state.mentioned_users.concat(action.user),
            };
        default:
            return state;
    }
};

export const initialState = message => {
    if (!message) {
        return {
            attachments: [],
            emojiPickerIsOpen: false,
            fileOrder: [],
            fileUploads: emptyFileUploads,
            imageOrder: [],
            imageUploads: emptyImageUploads,
            mentioned_users: [],
            numberOfUploads: 0,
            text: '',
            value: emptyValue,
        };
    }

    // if message prop is defined, get imageuploads, fileuploads, text, etc. from it
    const imageUploads =
        message.attachments
            ?.filter(({ type }) => type === 'image')
            .reduce((acc, attachment) => {
                const id = nanoid();

                return (acc[id] = {
                    ...acc[id],
                    file: {
                        name: attachment.fallback,
                    },
                    id,
                    state: 'finished',
                    url: attachment.image_url,
                });
            }, emptyImageUploads) || emptyImageUploads;

    const imageOrder = Object.keys(imageUploads);

    const fileUploads =
        message.attachments
            ?.filter(({ type }) => type === 'file')
            .reduce((acc, attachment) => {
                const id = nanoid();

                return acc.setIn([id], {
                    file: {
                        name: attachment.title,
                        size: attachment.file_size,
                        type: attachment.mime_type,
                    },
                    id,
                    state: 'finished',
                    url: attachment.asset_url,
                });
            }, emptyFileUploads) || emptyFileUploads;

    const fileOrder = Object.keys(fileUploads);

    const numberOfUploads = fileOrder.length + imageOrder.length;

    const attachments = message.attachments?.filter(({ type }) => type !== 'file' && type !== 'image') || [];

    const mentioned_users = message.mentioned_users || [];

    return {
        attachments,
        emojiPickerIsOpen: false,
        fileOrder,
        fileUploads,
        imageOrder,
        imageUploads,
        mentioned_users,
        numberOfUploads,
        text: '',
        value: message.value || emptyValue,
    };
};

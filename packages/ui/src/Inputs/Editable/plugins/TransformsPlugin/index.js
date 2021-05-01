/**
 * Enhances the editor to add some handy transforms.
 */
import { Transforms } from 'slate';

const withTransforms = () => editor => {
    editor.insertNodes = (nodes, options) => {
        try {
            Transforms.insertNodes(editor, nodes, options);
        } catch (error) {}
    };

    editor.setNodeById = (id, data) => {
        Transforms.setNodes(editor, data, {
            at: [],
            match: n => {
                return n.id === id;
            },
        });
    };

    return editor;
};

export const createTransformsPlugin = (options) => ({
	withOverrides: [withTransforms(options)]
});
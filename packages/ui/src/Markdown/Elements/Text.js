import Text from '../../Text';

const EditorText = ({ attributes, htmlAttributes, ...rest }) => <Text {...rest} {...attributes} {...htmlAttributes} />;

export default {
    p: {
        component: EditorText,
        rootProps: {
            fontSize: 4,
            lineHeight: 6,
            marginY: 4,
        },
    },
};

import { Text } from '../../Text';

const EditorLink = ({ attributes, htmlAttributes, ...rest }) => <Text as="a" {...rest} {...attributes} {...htmlAttributes} />;

export default {
    link: {
        component: EditorLink,
        rootProps: {
            color: 'primary',
            fontSize: 4,
            lineHeight: 6,
            marginY: 4,
        },
    },
};

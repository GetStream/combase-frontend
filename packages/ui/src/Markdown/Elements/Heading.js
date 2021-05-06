import { Heading } from '../../Text';
import { Title } from './Title';

const EditorHeading = ({ attributes, htmlAttributes, ...rest }) => <Heading {...rest} {...attributes} {...htmlAttributes} />;

export default {
    h1: {
        component: Title,
        hidden: true,
        rootProps: {
            as: 'h1',
            fontSize: 8,
            lineHeight: 10,
        },
    },
    h2: {
        component: EditorHeading,
        rootProps: {
            as: 'h2',
            marginTop: 6,
            fontSize: 7,
            lineHeight: 9,
        },
    },
    h3: {
        component: EditorHeading,
        rootProps: {
            as: 'h3',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
        },
    },
    h4: {
        component: EditorHeading,
        rootProps: {
            as: 'h4',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
        },
    },
    h5: {
        component: EditorHeading,
        rootProps: {
            as: 'h5',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
            color: 'altText',
        },
    },
    h6: {
        component: EditorHeading,
        rootProps: {
            as: 'h6',
            marginTop: 4,
            fontSize: 5,
            lineHeight: 7,
            fontWeight: 500,
            color: 'altText',
        },
    },
};

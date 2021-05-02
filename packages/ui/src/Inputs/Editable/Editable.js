import React, { forwardRef, useEffect, useMemo } from 'react';
import { Editable as SlateEditable, Slate } from 'slate-react';
import {
    createBoldPlugin,
    createCodePlugin,
    createHistoryPlugin,
    createItalicPlugin,
    createNodeIdPlugin,
    createParagraphPlugin,
    createReactPlugin,
    createSlatePluginsComponents,
    createUnderlinePlugin,
    ELEMENT_PARAGRAPH,
    useSlatePlugins,
} from '@udecode/slate-plugins';
import { nanoid } from 'nanoid';

import { Container } from '../../Layout';
import { Text } from '../../Text';

import { createTransformsPlugin } from './plugins/TransformsPlugin';
import { options } from './pluginOptions';
import createElement from './createElement';

const Editable = forwardRef(
    ({ children, Header, id, components: additionalComponents, placeholder, plugins: additionalPlugins, onChange, value, ...props }, ref) => {
        const components = useMemo(
            () =>
                createSlatePluginsComponents({
                    [ELEMENT_PARAGRAPH]: createElement(Text, {
                        fontSize: 3,
                        lineHeight: 5,
                        marginTop: 3,
                        marginBottom: 3,
                    }),
                    ...additionalComponents,
                }),
            [additionalComponents]
        );

        const plugins = useMemo(
            () => [
                createReactPlugin(),
                createHistoryPlugin(),
                createTransformsPlugin(),
                /**
                 * Elements
                 */
                createParagraphPlugin(),
                /**
                 * Marks
                 */
                createBoldPlugin(),
                createCodePlugin(),
                createItalicPlugin(),
                createUnderlinePlugin(),
                /**
                 * Transforms & Extensions
                 */
                createNodeIdPlugin({
                    idCreator: () => nanoid(16),
                }),
                ...additionalPlugins,
            ],
            [additionalPlugins]
        );

        const { slateProps, editableProps } = useSlatePlugins({
            components,
            id,
            plugins,
            options,
            onChange,
            value,
        });

        useEffect(() => {
            if (slateProps.editor && ref && !ref.current) {
                ref.current = slateProps.editor;
            }
        }, [slateProps.editor]);

        if (!slateProps.editor) return null;

        return (
            <Slate {...props} {...slateProps}>
                {Header || null}
                <Container>
                    <SlateEditable {...editableProps} placeholder={placeholder} />
                    {children}
                </Container>
            </Slate>
        );
    }
);

Editable.defaultProps = {
    components: {},
    plugins: [],
};

export default Editable;

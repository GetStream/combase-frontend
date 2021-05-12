import {
    createAlignPlugin,
    createAutoformatPlugin,
    createBlockquotePlugin,
    createCodeBlockPlugin,
    createStrikethroughPlugin,
    createExitBreakPlugin,
    createHeadingPlugin,
    createImagePlugin,
    createLinkPlugin,
    createListPlugin,
    createMediaEmbedPlugin,
    createNormalizeTypesPlugin,
    createResetNodePlugin,
    createSelectOnBackspacePlugin,
    createSoftBreakPlugin,
    createTablePlugin,
    createTodoListPlugin,
    createTrailingBlockPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_IMAGE,
    ELEMENT_LI,
    ELEMENT_LINK,
    ELEMENT_TODO_LI,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_PARAGRAPH,
    MARK_CODE,
} from '@udecode/slate-plugins';

import { options, markdownPluginOptions, chatPluginOptions } from '../pluginOptions';
import createElement from '../createElement';
import { chatAutoformat, markdownAutoformat } from '../autoformat';

import { createChatPlugin } from '../plugins/ChatPlugin';
import { createTitlePlugin, Title } from '../plugins/TitlePlugin';

import { Image, ListItem, TodoListItem, Quote } from '../Elements';
import Text, { Code } from '../../../Text';

export const Chat = {
    components: {
        [MARK_CODE]: createElement(Code, {
            fontSize: 2,
            lineHeight: 4,
            marginTop: 0,
            marginBottom: 0,
            marginY: 0,
            color: 'primary',
        }),
        [ELEMENT_PARAGRAPH]: createElement(Text, {
            fontSize: 3,
            lineHeight: 5,
            marginTop: 2,
            marginBottom: 2,
            paddingY: 2,
            paddingX: 1,
        }),
        [ELEMENT_LINK]: createElement(Text, {
            as: 'a',
            fontSize: 4,
            lineHeight: 6,
            marginTop: 3,
            marginBottom: 3,
            color: 'primary',
        }),
    },
    plugins: [
        createSoftBreakPlugin(chatPluginOptions.softBreakPlugin),
        createAutoformatPlugin(chatAutoformat),
        createLinkPlugin(),
        createTodoListPlugin(),
        createListPlugin(),
        createChatPlugin(),
    ],
};

export const Markdown = {
    components: {
        [ELEMENT_H1]: Title,
        [ELEMENT_H2]: createElement(Text, {
            as: 'h2',
            marginTop: 6,
            fontSize: 7,
            lineHeight: 9,
        }),
        [ELEMENT_H3]: createElement(Text, {
            as: 'h3',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
        }),
        [ELEMENT_H4]: createElement(Text, {
            as: 'h4',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
        }),
        [ELEMENT_H5]: createElement(Text, {
            as: 'h5',
            marginTop: 4,
            fontSize: 6,
            lineHeight: 8,
            fontWeight: 600,
            color: 'altText',
        }),
        [ELEMENT_H6]: createElement(Text, {
            as: 'h6',
            marginTop: 4,
            fontSize: 5,
            lineHeight: 7,
            fontWeight: 500,
            color: 'altText',
        }),
        [MARK_CODE]: createElement(Code, {
            fontSize: 4,
            lineHeight: 6,
            marginTop: 3,
            marginBottom: 3,
            color: 'primary',
        }),
        [ELEMENT_PARAGRAPH]: createElement(Text, {
            fontSize: 4,
            lineHeight: 6,
            marginTop: 3,
            marginBottom: 3,
        }),
        [ELEMENT_LINK]: createElement(Text, {
            as: 'a',
            fontSize: 4,
            lineHeight: 6,
            marginTop: 3,
            marginBottom: 3,
            color: 'primary',
        }),
        [ELEMENT_BLOCKQUOTE]: Quote,
        [ELEMENT_IMAGE]: Image,
        [ELEMENT_LI]: ListItem,
        [ELEMENT_TODO_LI]: TodoListItem,
    },
    plugins: [
        createBlockquotePlugin(),
        createHeadingPlugin(),
        createImagePlugin(),
        createLinkPlugin(),
        createTodoListPlugin(),
        createListPlugin(),
        createTablePlugin(),
        createMediaEmbedPlugin(),
        createCodeBlockPlugin(),
        createAlignPlugin(), // alignment is a wrapper div element with text-align styles
        /**
         * Marks
         */
        createStrikethroughPlugin(),
        /**
         * Transforms & Elements
         */
        createNormalizeTypesPlugin({
            rules: [{ path: [0, 0], strictType: options[ELEMENT_H1].type }],
        }),
        createTrailingBlockPlugin({
            type: options[ELEMENT_PARAGRAPH].type,
            level: 1,
        }),
        createSelectOnBackspacePlugin({ allow: options[ELEMENT_IMAGE].type }),
        createAutoformatPlugin(markdownAutoformat),
        createResetNodePlugin(markdownPluginOptions.resetNodePlugin),
        createSoftBreakPlugin(markdownPluginOptions.softBreakPlugin),
        createExitBreakPlugin(markdownPluginOptions.exitBreakPlugin),
        createTitlePlugin(),
    ],
};

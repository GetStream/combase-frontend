import React, { useMemo } from 'react';
import styled from 'styled-components';
import unified from 'unified';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import githubSchema from 'hast-util-sanitize/lib/github.json';
import parse from 'remark-parse';
import remark2react from 'remark-react';

import syntaxTheme from './syntaxTheme';
import { EmptyView, Spinner } from '../../Feedback';
import { Code, Heading, Text } from '../../Text';

const Root = styled.div`
	& > *:first-child {
		margin-top: 0;
	}
`

const sanitize = Object.assign({}, githubSchema, {
    attributes: Object.assign({}, githubSchema.attributes, {
        code: [...(githubSchema.attributes.code || []), 'className'],
        pre: [...(githubSchema.attributes.pre || []), 'className'],
    }),
});

const components = {
    h1: props => <Heading {...props} marginTop={7} fontSize={8} lineHeight={10} />,
    h2: props => <Heading {...props} marginTop={7} fontSize={7} lineHeight={9} />,
    h3: props => <Heading {...props} marginTop={7} fontSize={6} fontWeight={600} lineHeight={8} />,
    h4: props => <Heading {...props} marginTop={7} fontSize={6} fontWeight={600} lineHeight={8} />,
    h5: props => <Heading {...props} marginTop={7} fontSize={6} fontWeight={600} lineHeight={8} />,
    h6: props => <Heading {...props} marginTop={7} color="altText" fontSize={5} fontWeight={500} lineHeight={7} />,
    a: props => <Text {...props} color="primary" as="a" fontSize={3} lineHeight={5} />,
    p: props => <Text {...props} fontSize={3} marginY={4} lineHeight={6} />,
    li: props => <Text as="li" {...props} fontSize={3} marginY={4} lineHeight={6} />,
    pre: props => {
        return props.children;
    },
    code: (props = {}) => {
        const [name, language] = props?.className?.split('-') || [];

        // Only render the syntax highlighter for code tags with class='language-*'
        if (name === 'language' && language) {
            return <SyntaxHighlighter style={syntaxTheme} language={language} {...props} />;
        }

        return <Code {...props} />;
    },
};

const MarkdownRenderer = ({ md }) => {
    const pageContent = useMemo(
        () =>
            md
                ? // eslint-disable-next-line no-sync
                  unified().use(parse).use(remark2react, { sanitize, remarkReactComponents: components }).processSync(md).result
                : null,
        [md]
    );

    return (
        <Root>
            {pageContent ?? (
                <EmptyView marginTop={6} title="">
                    <Spinner />
                </EmptyView>
            )}
        </Root>
    );
};

export default MarkdownRenderer;

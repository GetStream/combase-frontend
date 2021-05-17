import React from 'react';

import { render } from '@conf/test-utils';

import MarkdownRenderer from '.';

describe('MarkdownRenderer', () => {
    test('renders correctly', () => {
        render(<MarkdownRenderer />);
    });
});

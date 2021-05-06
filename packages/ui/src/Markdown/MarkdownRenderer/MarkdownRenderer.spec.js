import React from 'react';

import { render } from '../../../../../config/test-utils';

import MarkdownRenderer from '.';

describe('MarkdownRenderer', () => {
    test('renders correctly', () => {
        render(<MarkdownRenderer />);
    });
});

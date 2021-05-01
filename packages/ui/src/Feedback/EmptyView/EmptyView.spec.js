import React from 'react';

import { render } from '@conf/test-utils';

import EmptyView from '.';

describe('EmptyView', () => {
    test('renders correctly', () => {
        render(<EmptyView />);
    });
});

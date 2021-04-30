import React from 'react';

import { render } from '../../../../config/test-utils';

import EmptyView from '.';

describe('EmptyView', () => {
    test('renders correctly', () => {
        render(<EmptyView />);
    });
});

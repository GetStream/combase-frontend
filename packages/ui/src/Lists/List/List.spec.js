import React from 'react';
import '@conf/matchMedia.mock';

import { render } from '@conf/test-utils';

import { List } from '.';

describe('List', () => {
    test('renders correctly', () => {
        render(<List />);
    });
});

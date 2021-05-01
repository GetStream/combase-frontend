import React from 'react';
import { themes } from '@combase.app/styles';

import { render } from '@conf/test-utils';

import Badge from './Badge';

describe('Badge', () => {
    test('renders correctly', () => {
        render(<Badge />);
    });

    test('displays the correct color from the theme', () => {
        const colorName = 'red';

        const { queryByTestId } = render(<Badge color={colorName} />);

        expect(queryByTestId('badge')).toHaveStyleRule({
            backgroundColor: themes.light.colors.red,
        });
    });
});

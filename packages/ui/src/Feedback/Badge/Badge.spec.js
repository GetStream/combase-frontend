import React from 'react';
import { themes } from '@combase.app/styles';

import { render } from '../../../../../config/test-utils';

import { Badge } from '.';

describe('Badge', () => {
    test('renders correctly', () => {
        render(<Badge />);
    });

    test('displays the correct color from the theme', () => {
        const colorName = 'red';

        const { queryByTestId } = render(<Badge color={colorName} />);

        expect(queryByTestId('statusdot')).toHaveStyleRule({
            backgroundColor: themes.light.color.red,
        });
    });
});

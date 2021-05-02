import React from 'react';

import { act, render } from '@conf/test-utils';

import ButtonBase from './ButtonBase';

describe('ButtonBase', () => {
    it('Handles a click by calling the onClick callback.', () => {
		const onClick = jest.fn();
		
        const {queryByTestId} = render(<ButtonBase onClick={onClick} />);
		
		act(() => {
			queryByTestId('button-base').click();
		});

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});

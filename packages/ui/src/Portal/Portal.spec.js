import React from 'react';
import { render } from '@conf/test-utils';

import Portal from '.';

const text = "I'm Rendered in document.body instead of the React Tree!";

test('should render with no errors', () => {
    const { queryByText } = render(
        <Portal>
            <p>{text}</p>
        </Portal>
    );

    expect(queryByText(text)).not.toBeNull();
});

test('should not render if unmount prop is truthy', () => {
    const { container } = render(
        <Portal unmount>
            <p data-testid="portal-content">{text}</p>
        </Portal>
    );

    expect(container.childNodes).toHaveLength(0);
});

test('should call on rendered when mounting', () => {
    const onRendered = jest.fn();

    render(
        <Portal onRendered={onRendered}>
            <p data-testid="portal-content">{text}</p>
        </Portal>
    );

    expect(onRendered).toHaveBeenCalledWith();
    expect(onRendered).toHaveBeenCalledTimes(1);
});

test('should render normally when the portal is disabled', () => {
    const { baseElement, queryByTestId } = render(
        <Portal disabled>
            <p data-testid="portal-content">{text}</p>
        </Portal>
    );

    expect(queryByTestId('portal-content').parentNode).not.toStrictEqual(baseElement);
});

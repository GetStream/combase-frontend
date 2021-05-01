import { useCallback, useState } from 'react';

export const useListCursor = (items, vertical = false, actions) => {
    const count = items?.length || 0;
    const [cursor, setCursor] = useState();

    const decrementCursor = useCallback(
        e =>
            setCursor(prev => {
                if (prev === 0) {
                    return undefined;
                }

                if (typeof prev === 'undefined') {
                    return e.target.selectionStart === 0 ? count - 1 : prev;
                }

                return Math.max(prev - 1, 0);
            }),
        [count]
    );

    const incrementCursor = useCallback(
        e =>
            setCursor(prev => {
                if (typeof prev === 'number') {
                    e.preventDefault();
                }

                const newCursor = typeof prev === 'undefined' ? 0 : prev + 1;

                return newCursor === count ? undefined : newCursor;
            }),
        [count]
    );

    const onBackspace = useCallback(
        e => {
            if (actions) {
                if (e.target.selectionStart === 0) {
                    setCursor(prev => {
                        if (typeof prev === 'number') {
                            actions.removeAt(prev);

                            const newIdx = Math.max(0, prev - 1);

                            return newIdx === 0 && !prev ? undefined : newIdx;
                        }

                        return count - 1;
                    });
                }
            }
        },
        [actions, count]
    );

    const onEnter = useCallback(
        e => {
            if (actions && e.target?.value) {
                const newChip = actions.transformValue(e.target?.value);

                if (items.includes(newChip)) return;

                actions.push(newChip);
                setCursor(undefined);
            }
        },
        [actions, items]
    );

    const onKeyDown = useCallback(
        e => {
            if (e.key === 'Enter') {
                return onEnter(e);
            }

            if (e.key === 'Backspace') {
                return onBackspace(e);
            }

            switch (vertical) {
                case true:
                    switch (e.key) {
                        case 'ArrowUp':
                            return decrementCursor(e);
                        case 'ArrowDown':
                            return incrementCursor(e);
                        default:
                            return null;
                    }

                case false:
                    switch (e.key) {
                        case 'ArrowLeft':
                            return decrementCursor(e);
                        case 'ArrowRight':
                            return incrementCursor(e);
                        default:
                            return null;
                    }

                default:
                    break;
            }
        },
        [decrementCursor, incrementCursor, onBackspace, onEnter, vertical]
    );

    return [
        cursor,
        {
            onKeyDown,
            onBackspace,
        },
        setCursor,
    ];
};

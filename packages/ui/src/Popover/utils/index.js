export const getTransformOrigin = placement => {
    let [y, x] = placement.split('-');

    let flipX = y === 'left' || y === 'right';
    let flipY = x === 'start' && flipX;

    if (!x) {
        switch (y) {
            case 'left':
                return `100% 50%`;
            case 'right':
                return `0% 50%`;
            case 'top':
                return `50% 100%`;
            case 'bottom':
                return `50% 0%`;
            default:
                return `50% 50%`;
        }
    }

    switch (x) {
        case 'start':
            x = flipX ? 'right' : 'left';

            break;
        case 'end':
            x = flipX ? 'left' : 'right';

            break;
        default:
            x = 'center';
    }

    switch (y) {
        case 'bottom':
            y = flipY ? 'bottom' : 'top';

            break;
        default:
            y = flipY ? 'top' : 'bottom';

            break;
    }

    return `${y} ${x}`;
};

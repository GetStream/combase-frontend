import { variant } from '@combase.app/styles';

import IconLabel from '../../IconLabel';

export const buttonSizeVariants = variant({
    prop: 'size',
    variants: {
        sm: {
            borderRadius: 2,
            minHeight: 6,
            paddingX: 4,
            paddingY: 0,
        },
        xs: {
            borderRadius: 2,
            minHeight: 3,
            paddingX: 3,
            paddingY: 2,
        },
    },
});

export const buttonVisualVariants = props => {
    const color = props.disabled ? 'disabled' : props.color;

    return variant({
        variants: {
            flat: {
                transition: ({ easing }) => `80ms background ${easing.move}`,
                backgroundColor: 'transparent',
                boxShadow: 'unset',
                [`& ${IconLabel} > p`]: {
                    color,
                },
                [`svg path`]: {
                    fill: color,
                },
                '&:hover': {
                    backgroundColor: `${color}A.4`,
                },
                '&:active': {
                    backgroundColor: `${color}A.8`,
                },
            },
            raised: {
                transition: ({ easing }) => `40ms box-shadow ${easing.move}`,
                backgroundColor: color,
                boxShadow: props.disabled ? 'unset' : 1,
                [`& ${IconLabel} > p`]: {
                    color: 'white',
                },
                [`svg path`]: {
                    fill: 'white',
                },
                '&:hover': {
                    boxShadow: props.disabled ? 'unset' : 3,
                },
                '&:active': {
                    boxShadow: props.disabled ? 'unset' : 2,
                },
            },
        },
    });
};

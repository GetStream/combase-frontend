import { variant } from '@combase.app/styles';

import { IconLabel } from '../../IconLabel';

export const buttonSizeVariants = variant({
    prop: 'size',
    variants: {
        xs: {
            minHeight: 7,
            paddingX: 3,
            paddingY: 0,
        },
    },
});

export const buttonVisualVariants = props => {
    const color = props.disabled ? 'disabled' : props.color;
	console.log(color);
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
                    backgroundColor: ({ utils }) => props.disabled ? 'disabled' : utils.colors.fade(color, 0.04),
                },
                '&:active': {
                    backgroundColor: ({ utils }) => props.disabled ? 'disabled' : utils.colors.fade(color, 0.08),
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

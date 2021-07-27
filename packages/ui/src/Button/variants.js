import { variant } from '@combase.app/styles';

import IconLabel from '../IconLabel';

export const buttonSizeVariants = variant({
    prop: 'size',
    variants: {
        xs: {
            minHeight: 8,
            paddingX: 3,
            paddingY: 0,
			borderRadius: 2,
        },
		sm: {
			minHeight: 9,
            paddingX: 4,
            paddingY: 0,
			borderRadius: 2,
		}
    },
});

export const buttonVisualVariants = props => {
    const color = props.disabled ? 'disabled' : props.color;

    return variant({
        variants: {
            flat: {
                transition: ({ easing }) => `80ms background ${easing.move}`,
                backgroundColor: props.backgroundColor || 'transparent',
                boxShadow: 'unset',
                [`& ${IconLabel} > p`]: {
                    color,
                },
                [`& path`]: {
                    fill: color,
                },
                '&:hover': {
                    backgroundColor: ({ colors, utils }) => props.disabled ? 'disabled' : utils.colors.fade(colors[color], 0.04),
                },
                '&:active': {
                    backgroundColor: ({ colors, utils }) => props.disabled ? 'disabled' : utils.colors.fade(colors[color], 0.08),
                },
            },
            raised: {
                transition: ({ easing }) => `40ms box-shadow ${easing.move}`,
                backgroundColor: color,
                boxShadow: props.disabled ? 'unset' : 1,
                [`& ${IconLabel} > p`]: {
                    color: 'white',
                },
                [`& path`]: {
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

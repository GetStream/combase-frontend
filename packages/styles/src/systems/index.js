import { get, system, variant } from 'styled-system';

export const wrapperBorderRadius = system({
    borderRadius: {
        property: 'borderRadius',
        scale: 'radii',
        transform: (v, scale) => `calc(${get(scale, v)} + 0.2rem)`,
    },
});

export const placeholderColor = system({
    placeholderColor: {
        property: 'color',
        scale: 'colors',
    },
});

export const colorAlpha = system({
    backgroundColor: {
        property: 'backgroundColor',
        scale: 'colors',
		transform: (v, scale, { backgroundColorAlpha = 1, theme }) => theme.utils.colors.fade(get(scale, v), backgroundColorAlpha),
    },
    color: {
        property: 'color',
        scale: 'colors',
		transform: (v, scale, { colorAlpha = 1, theme }) => theme.utils.colors.fade(get(scale, v), colorAlpha),
    },
});

export const parentColorVariants = ({ color }) => variant({
	variants: {
		ghost: {
			backgroundColor: ({ colors, utils }) => utils.colors.fade(color.startsWith('#') ? color : get(colors, color), 0.08),
		},
		filled: {
			backgroundColor: ({ colors }) => get(colors, color)
		},
		border: {
			borderWidth: 'thin',
			borderStyle: 'solid',
			borderColor: ({ colors }) => get(colors, color),
		},
	}
});

export const childColorVariants = ({ color }) => variant({
	variants: {
		ghost: {
			color: ({ colors }) => get(colors, color),
		},
		border: {
			color: ({ colors }) => get(colors, color),
		},
		filled: {
			color: 'white !important',
			'& path': {
				fill: 'white'
			}
		},
	}
});

export const fill = system({
    color: {
        property: 'fill',
        scale: 'colors',
		transform: (v, scale, { fillAlpha = 1, theme }) => theme.utils.colors.fade(get(scale, v), fillAlpha),
    },
    fill: {
        property: 'fill',
        scale: 'colors',
		transform: (v, scale, { fillAlpha = 1, theme }) => theme.utils.colors.fade(get(scale, v), fillAlpha),
    },
});

export const itemGap = system({
    gapBottom: {
        property: 'marginBottom',
        scale: 'space',
    },
    gapLeft: {
        property: 'marginLeft',
        scale: 'space',
    },
    gapRight: {
        property: 'marginRight',
        scale: 'space',
    },
    gapTop: {
        property: 'marginTop',
        scale: 'space',
    },
});

export const interactions = ({ active, color = 'text', disabled, hoverColor, theme }) =>
    disabled
        ? {}
        : variant({
              prop: 'interaction',
              variants: {
                  highlight: {
                      cursor: disabled ? 'inherit' : 'pointer',
                      transition: ({ easing }) => `120ms background ${easing.move}`,
                      backgroundColor: active ? theme.utils.colors.fade(hoverColor || color, 0.02) : 'transparent',
                      boxShadow: 'unset',
                      '&:hover': {
                          backgroundColor: theme.utils.colors.fade(hoverColor || color, 0.02),
                      },
                      '&:active': {
                          backgroundColor: theme.utils.colors.fade(hoverColor || color, 0.04),
                      },
                  },
                  bump: {
                      cursor: disabled ? 'inherit' : 'pointer',
                      boxShadow: 4,
                      transition: ({ easing }) => `80ms box-shadow ${easing.move}, 160ms transform ${easing.move}`,
                      '&:hover': {
                          boxShadow: 6,
                          transform: 'translate3d(0px, -1px, 0px)',
                      },
                      '&:active': {
                          boxShadow: 3,
                          transform: 'translate3d(0px, 0px, 0px) scale(0.99)',
                      },
                  },
                  hover: {
                      cursor: disabled ? 'inherit' : 'pointer',
                      backgroundColor: active ? theme.utils.colors.fade(color, 0.02) : 'transparent',
                      [`@media (min-width: ${theme.breakpoints[1]})`]: {
                          transition: ({ easing }) => `56ms background ${easing.move}`,
                          '&:hover': {
                              backgroundColor: theme.utils.colors.fade(color, 0.02),
                          },
                      },
                  },
                  raise: {
                      cursor: disabled ? 'inherit' : 'pointer',
                      transition: ({ easing }) => `40ms box-shadow ${easing.move}`,
                      boxShadow: 1,
                      '&:hover': {
                          boxShadow: 3,
                      },
                      '&:active': {
                          boxShadow: 2,
                      },
                  },
                  opacity: {
                      cursor: disabled ? 'inherit' : 'pointer',
                      transition: ({ easing }) => `120ms opacity ${easing.move}`,
                      opacity: active ? 1 : 0.56,
                      '&:hover': {
                          opacity: 1,
                      },
                      '&:active': {
                          opacity: 0.32,
                      },
                  },
              },
          });

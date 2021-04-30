import { system, variant } from 'styled-system';

export const wrapperBorderRadius = system({
    borderRadius: {
        property: 'borderRadius',
        scale: 'radii',
        transform: (v, scale) => `calc(${scale[v]} + 0.2rem)`,
    },
});

export const placeholderColor = system({
    placeholderColor: {
        property: 'color',
        scale: 'colors',
    },
});

export const fill = system({
    color: {
        property: 'fill',
        scale: 'colors',
    },
    fill: {
        property: 'fill',
        scale: 'colors',
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
                      backgroundColor: active ? `${color}A.2` : 'transparent',
                      boxShadow: 'unset',
                      '&:hover': {
                          backgroundColor: `${color}A.2`,
                      },
                      '&:active': {
                          backgroundColor: `${color}A.4`,
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
                      backgroundColor: active ? `${color}A.2` : 'transparent',
                      [`@media (min-width: ${theme.breakpoints[1]})`]: {
                          transition: ({ easing }) => `56ms background ${easing.move}`,
                          '&:hover': {
                              backgroundColor: hoverColor || `${color}A.2`,
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

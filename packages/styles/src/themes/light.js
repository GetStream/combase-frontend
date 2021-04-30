import createTheme from './createTheme';

const light = createTheme(({ colors, utils }) => ({
	colors: {
		primary: colors.blue,
		background: colors.offWhite,
		border: utils.colors.lighten(colors.gray, .075),
		disabled: colors.lightGray,
		shadow: utils.colors.darken(colors.border, .4),
		surface: colors.white,
		text: colors.slate,
		altText: colors.lavender,
	},
	dark: false,
	name: 'light',
}));

export { light };
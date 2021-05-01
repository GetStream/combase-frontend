import createTheme from './createTheme';

const light = createTheme(({ colors, utils }) => ({
	colors: {
		primary: colors.blue,
		background: colors.offWhite,
		border:colors.gray,
		disabled: colors.lightGray,
		shadow: utils.colors.darken(colors.gray, .24),
		surface: colors.white,
		text: colors.slate,
		altText: colors.lavender,
	},
	dark: false,
	name: 'light',
}));

export { light };
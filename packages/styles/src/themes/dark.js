import createTheme from './createTheme';

const dark = createTheme(({ colors, utils }) => ({
	colors: {
		primary: colors.blue,
		background: colors.slate,
		border: colors.lightSlate,
		disabled: utils.colors.fade(colors.white, 0.04),
		shadow: colors.trueBlack,
		surface: colors.darkSlate,
		text: colors.white,
		altText: utils.colors.fade(colors.white, 0.24),
	},
	dark: true,
	name: 'dark',
}));

export { dark };
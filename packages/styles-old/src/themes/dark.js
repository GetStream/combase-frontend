import base from './base';

export const dark = {
	...base,
	colors: {
		...base.colors,
		primary: base.colors.blue,
		background: base.colors.slate,
		border: base.colors.lightSlate,
		disabled: base.utils.colors.fade(base.colors.white, 0.04),
		shadow: base.colors.trueBlack,
		surface: base.colors.darkSlate,
		text: base.colors.white,
		altText: base.utils.colors.fade(base.colors.white, 0.24),
	},
	dark: true,
	name: 'dark',
}

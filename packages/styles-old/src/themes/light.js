import base from './base';

export const light = {
	...base,
	colors: {
		...base.colors,
		primary: base.colors.blue,
		background: base.colors.offWhite,
		border:base.colors.gray,
		disabled: base.colors.gray,
		shadow: base.utils.colors.darken(base.colors.gray, .24),
		surface: base.colors.white,
		text: base.colors.slate,
		altText: base.colors.lavender,
	},
	dark: false,
	name: 'light',
}
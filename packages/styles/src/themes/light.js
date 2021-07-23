import { createShadows } from '../utils';
import base from './base';

const shadow = base.utils.colors.darken(base.colors.gray, .24);

export const light = {
	...base,
	colors: {
		...base.colors,
		primary: base.colors.blue,
		background: base.colors.white,
		border:base.colors.gray,
		disabled: base.colors.gray,
		shadow,
		surface: base.colors.white,
		text: base.colors.slate,
		altText: base.colors.lavender,
	},
	shadows: createShadows(shadow),
	dark: false,
	name: 'light',
}
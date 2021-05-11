import { createShadows } from '../utils';
import base from './base';

const shadow = base.colors.trueBlack;

export const dark = {
	...base,
	colors: {
		...base.colors,
		primary: base.colors.blue,
		background: base.colors.slate,
		border: base.colors.lightSlate,
		disabled: base.utils.colors.fade(base.colors.white, 0.04),
		shadow,
		surface: base.colors.darkSlate,
		text: base.colors.white,
		altText: base.utils.colors.fade(base.colors.white, 0.24),
	},
	dark: true,
	shadows: createShadows(shadow),
	name: 'dark',
}

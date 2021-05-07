import range from 'lodash.range';

import { colors as colorUtils } from './colors';

const alphaSteps = range(0, 1, 0.01);

export const createColorVariations = (colors) => {
	let variations = {};
	// eslint-disable-next-line no-unused-vars
	for (const [name, color] of Object.entries(colors)) {
		// eslint-disable-next-line no-param-reassign
		variations[`${name}A`] = alphaSteps.map((alpha) => colorUtils.fade(color, alpha));
	}

	return variations;
}
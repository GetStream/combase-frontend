import deepmerge from 'deepmerge';

import initialBaseTheme from './base';

/**
 * Takes an overrides object used to manipulate the base theme in './base.js' and extend it to create new theme variations.
 * 
 * By passing a function that returns the overrides object, you can access the base values when creating a new theme.
 * 
 * @param {Object} overrides 
 * @returns ThemeObject
 */
const createTheme = (overrides) => {
	const base = deepmerge(initialBaseTheme, typeof overrides === 'function' ? overrides(initialBaseTheme) : overrides);
	return {
		...base,
		colors: {
			...base.colors,
			...base.utils.createColorVariations(base.colors),
		},
		shadows: base.utils.createShadows(base.colors.shadow),
	};
};

export default createTheme;
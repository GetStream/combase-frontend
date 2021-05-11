import tinycolor from 'tinycolor2';

export const colors = {
	darken: (c, f = 0)  => tinycolor(c).clone().darken(f * 100).toRgbString(),
	fade: (c, a) => tinycolor(c).setAlpha(a).toRgbString(),
    gradient: (hex) => {
        const original = tinycolor(hex);

        const pair = original.clone().lighten(16);

        return `linear-gradient(180deg, ${pair.toHexString()} 0%, ${original.toHexString()} 100%)`;
    },
	lighten: (c, f = 0)  => tinycolor(c).clone().lighten(f * 100).toRgbString(),
};

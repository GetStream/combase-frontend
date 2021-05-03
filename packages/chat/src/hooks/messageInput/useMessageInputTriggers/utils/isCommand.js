export const isCommand = text => {
	if (text[0] !== '/') return false;

    const tokens = text.split(' ');

    if (tokens.length > 1) return false;

    return true;
};
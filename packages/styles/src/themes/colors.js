const colors = {
    black: '#070A0D',
    blue: '#005EFF',
	lightBlue: '#00a2dd',
    gray: '#EDECF0',
    green: '#2ec87b',
    lavender: '#848EA9',
    offWhite: '#F7F7F9',
    burntOrange: '#E6622F',
    orange: '#fd971f',
    yellow: '#F3CC41',
    purple: '#8888ff',
    red: '#F94141',
	pink: '#f92673',
    teal: '#41E9F3',
    lightSlate: '#181A24',
    darkSlate: '#0A0D14',
    slate: '#0E1118',
    trueBlack: '#000000',
    white: '#ffffff',
};

colors.primary = colors.blue;

colors.shadow = colors.trueBlack;

colors.success = colors.green;
colors.info = colors.blue;
colors.error = colors.red;
colors.warning = colors.orange;

colors.ticketStatus = {
	open: colors.green,
	closed: colors.gray,
	archived: colors.lightSlate,
	unassigned: colors.red,
	new: colors.blue,
}

colors.access = {
	guest: colors.green,
	moderator: colors.altText,
	admin: colors.blue,
}

export default colors;
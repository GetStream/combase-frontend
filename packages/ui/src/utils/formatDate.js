import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';

const normalizeDate = (date) => typeof date === 'string' ? parseISO(date) : date;

export const formatDateFromNow = (date) => date ? formatDistanceToNow(normalizeDate(date), { addSuffix: true }) : null

export const formatDateFull = (date) => date ? format(normalizeDate(date), 'EEEE, LLLL do') : null

export const formatTime = (date) => {
	if (!date) {
		return null;
	}

	date = normalizeDate(date);

	const now = new Date();
	const dayAgo = startOfDay(now);
	const weekAgo = subDays(now, 6);
	const yearAgo = subDays(now, 364);

	if (isBefore(date, yearAgo)) {
		return format(date, 'MM/dd/yy');
	}

	if (isBefore(date, weekAgo)) {
		return format(date, 'MM/dd');
	}

	if (isBefore(date, dayAgo)) {
		return formatDateFromNow(date);
	}

	return format(date, 'H:mm');
};
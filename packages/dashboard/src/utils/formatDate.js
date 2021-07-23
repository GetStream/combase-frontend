import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

export const formatDateFromNow = (date) => date ? `${formatDistanceToNow(typeof date === 'string' ? parseISO(date) : date)} ago` : null
export const formatDateFull = (date) => date ? format(typeof date === 'string' ? parseISO(date) : date, 'EEEE, LLLL do') : null
import { listModeVar } from '../../variables';

/**
 * Toggle the Global List Mode Preference.
 * Can be "grid" or "list"
 * @param {string}
 * @return {string} - returns the listMode value.
 */
export const toggleListMode = force => {
    const listMode = listModeVar();

    return listModeVar(force || listMode === 'grid' ? 'list' : 'grid');
};

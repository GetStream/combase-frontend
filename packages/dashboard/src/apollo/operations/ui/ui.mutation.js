import { listModeVar, themeVar } from '../../variables';

/**
 * Set the UI Theme.
 * Can be dark, light, or system.
 * @param {string} [theme='system']
 * @return {string} - returns the theme value.
 */
export const setUITheme = (theme = 'system') => {
    localStorage.setItem('combase-uitheme', theme);

    return themeVar(theme);
};

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

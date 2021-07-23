import { makeVar } from '@apollo/client';

/**
 * The current ui theme
 * Persisted on change in the mutation operation {See: @combase.app/apollo/operations/ui}
 */
export const themeVar = makeVar(localStorage.getItem('combase-uitheme') || 'system');

/**
 * The Authed User ID & Token stored as an array
 * Persisted on change in the mutation operation {See: @combase.app/apollo/operations/auth}
 */
export const authenticationVar = makeVar(localStorage.getItem('token'));

/**
 * The current preference in how lists are rendered
 * Possible values: list,grid
 */
export const listModeVar = makeVar('list');

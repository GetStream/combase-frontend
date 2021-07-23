import React, {useMemo} from 'react';
import { useMedia } from 'react-use';
import { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { themes } from '@combase.app/styles';

import useCurrentUser from 'hooks/useCurrentUser';
import { themeVar } from 'apollo/variables';

const prepareTheme = (theme, overrides) => ({
	...theme,
	colors: {
		...theme.colors,
		primary: overrides.color,
	}
});

const ThemeSwitcher = ({ children }) => {
	const { data } = useCurrentUser();
	const overrides = data?.me?.theme || {};
	/**
     * @name Theme
     */
	const themeMode = useReactiveVar(themeVar);
	const systemDarkMode = useMedia(`(prefers-color-scheme: dark)`);

	const theme = useMemo(() => {
		if (themeMode === 'system') {
			const themeObj = systemDarkMode ? themes.dark : themes.light;
			return prepareTheme(themeObj, overrides);
		}
 
		return prepareTheme(themes[themeMode], overrides);
	}, [overrides, themeMode, systemDarkMode]);
 
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

export default ThemeSwitcher;
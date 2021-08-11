import React, {useMemo} from 'react';
import { useMedia } from 'react-use';
import { ThemeProvider } from 'styled-components';
import { themes } from '@combase.app/styles';

import useCurrentUser from 'hooks/useCurrentUser';

const prepareTheme = (theme, overrides) => ({
	...theme,
	colors: {
		...theme.colors,
		primary: overrides?.color ?? theme.colors.primary,
	}
});

const ThemeSwitcher = ({ children }) => {
	const { data } = useCurrentUser();
	const overrides = data?.me?.theme || {};
	const preferences = data?.me?.preferences || {};
	
	/**
     * @name Theme
     */
	const systemDarkMode = useMedia(`(prefers-color-scheme: dark)`);

	const theme = useMemo(() => {
		if (!preferences?.uitheme || preferences?.uitheme === 'system') {
			const themeObj = systemDarkMode ? themes.dark : themes.light;
			return prepareTheme(themeObj, overrides);
		}
 
		return prepareTheme(themes[preferences?.uitheme], overrides);
	}, [preferences, overrides, systemDarkMode]);
 
	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

export default ThemeSwitcher;
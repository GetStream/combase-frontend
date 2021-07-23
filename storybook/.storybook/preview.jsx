import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { themes } from '@combase.app/styles';
import '@combase.app/styles/fonts/index.css';

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
		outline: 0;
		-webkit-tap-highlight-color: transparent;
    }

    html, body {
        margin: 0;
        padding: 0;
		height: 100%;
		width: 100%;
        background-color: ${({ theme }) => theme.colors.background};
    }

    input, textarea {
        outline: 0;
        border: 0;
    }

	.sb-show-main.sb-main-padded {
		padding: 0;
		height: 100%;

		& > #root {
			height: 100%;
		}
	}
`;


export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
	(Story, context) => (
		<ThemeProvider theme={themes[context.globals.theme]}>
			<Story />
			<Global />
		</ThemeProvider>
	)
]
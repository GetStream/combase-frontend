import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@combase.app/apollo';
import { themes } from '@combase.app/styles';
import '@combase.app/styles/fonts/index.css';

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
		height: 100%;
		width: 100%;
        background-color: ${({ theme }) => theme.colors.background};
    }

    input, textarea{
        outline: 0;
        border: 0;
    }

	.sb-show-main.sb-main-padded {
		padding: .5rem;
		height: 100%;

		& > #root {
			border-radius: ${({ theme }) => theme.radii[2]};
			padding: 1rem;
			background-color: ${({ theme }) => theme.colors.surface};
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
			<ApolloProvider endpoint={process.env.STORYBOOK_API_URL}>
				<Story />
				<Global />
			</ApolloProvider>
		</ThemeProvider>
	)
]
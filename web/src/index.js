import React from 'react';
import ReactDOM from 'react-dom';
import { themes } from '@combase.app/styles';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@combase.app/styles/fonts/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themes.light}>
		<App />
		<GlobalStyles />
	</ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

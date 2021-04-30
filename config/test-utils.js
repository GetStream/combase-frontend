import React from 'react';
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { themes } from '@combase.app/styles';

const TestWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={themes.light}>
        {children}
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { 
	  wrapper: TestWrapper,
      ...options 
    });

export * from '@testing-library/react'; // eslint-disable-line no-duplicate-imports

export { customRender as render };
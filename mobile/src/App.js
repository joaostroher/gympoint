import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '~/styles/theme';
import Routes from '~/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
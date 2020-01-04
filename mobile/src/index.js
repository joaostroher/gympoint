import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import '~/config/ReactotronConfig';
import store from '~/store';
import theme from '~/styles/theme';

import App from '~/App';

export default function src() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </>
  );
}

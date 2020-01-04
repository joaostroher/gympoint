import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import '~/config/ReactotronConfig';
import '~/config/YupConfig';

import history from '~/services/history';
import Routes from '~/routes';

import { store, persistor } from '~/store';

import GlobalStyle from '~/styles/global';
import theme from '~/styles/theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

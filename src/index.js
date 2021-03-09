/**
 * index.js
 * This is the entry file for the application
 */
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { createBrowserHistory } from 'history';
 import { BrowserRouter } from 'react-router-dom';
 import { Provider } from 'react-redux';
 import { I18nextProvider } from 'react-i18next';
 import { SnackbarProvider } from "notistack";

 import theme from './configs/themes/default';
 import { ThemeProvider } from '@material-ui/core/styles';
 import CssBaseline from '@material-ui/core/CssBaseline';
 import './assets/stylesheets/index.scss';
 
 // Import root app
 import App from './containers/App/App';
 
 // Import error wrapper
 import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
 
 // Import locales settings
 import i18next from './configs/locales/i18n';
 
 // Import redux store configuration
 import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
 
 const history = createBrowserHistory({ hashType: 'noslash' });
 const { store, persist } = configureStore({}, history);
 
 const ROOT_ELEMENT = document.getElementById('app');
 
 ReactDOM.render(
   <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18next}>
        <SnackbarProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </ErrorBoundary>
        </SnackbarProvider>
      </I18nextProvider>
     </ThemeProvider>      
    </PersistGate>
   </Provider>,
   ROOT_ELEMENT,
 );
 
import React from 'react';
import './config/ReactotronConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './store';

import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={5000} />
    </Provider>
  );
}

export default App;

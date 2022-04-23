import React from 'react';
import ReactDOM from 'react-dom';
import './utils/i18n';
import App from './App';
import './index.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Provider } from 'react-redux';
import store from './utils/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

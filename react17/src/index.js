import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import "./library/axios.js";
import "./library/toaster.js";

import store from './store/index.js'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

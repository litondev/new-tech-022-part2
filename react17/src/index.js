import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import "./library/axios.js";
import "./library/toaster.js";

import store from './store/index.js'
import { Provider } from 'react-redux'

const renderApp = (user = null) => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App user={user}/>
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
}

if(localStorage.getItem("user-token")){
  window.$axios.get("/me")
  .then(res => {    
    renderApp(res.data.user)
  })
  .catch(err => {
    localStorage.removeItem("user-token")
    renderApp(false)
  })
}else{
  renderApp(false)
}
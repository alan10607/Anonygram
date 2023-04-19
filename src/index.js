import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import i18n from './util/i18n';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router >
        <App/>
      </Router>
    </Provider>
  // </React.StrictMode>
);
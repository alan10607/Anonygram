import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from './redux/store';
import App from './App';
import i18n from './i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router basename={ process.env.PUBLIC_URL }>
        <App/>
      </Router>
    </Provider>
  // </React.StrictMode>
);

console.log(String.raw`
    ___  _   __ ___  _   __  __ ____ ____  ___  __  ___
   /   |/ | / / __ \/ | /\ \/ / ___// __ \/   |/  |/  /
  / /| /  |/ / / / /  |/ /\  / / __/ /_/ / /| / /|_/ /
 / __ / /|  / /_/ / /|  / / / /_/ / _  _/ __ / /  / /
/_/  /_/ |_/\____/_/ |_/ /_/\____/_/ |_/_/  /_/  /_/
 
`);
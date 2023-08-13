import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import store from 'redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <Router >
      <App />
    </Router>
    {/* </PersistGate> */}
  </Provider>
  // </React.StrictMode>
);
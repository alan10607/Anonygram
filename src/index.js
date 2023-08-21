import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import store from "redux/store";
import i18n from 'util/i18n';//do not remove this import if need i18n
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
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
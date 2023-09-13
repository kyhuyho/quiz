/* eslint-disable react/no-deprecated */
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-pro-sidebar/dist/css/styles.css";
import "../node_modules/nprogress/nprogress.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-awesome-lightbox/build/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={1000} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

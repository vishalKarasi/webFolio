import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { store } from "@app/services/store.js";
import App from "./app/App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Model from "@src/components/model/Model.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<Model type="loading" />}>
      <ToastContainer position="top-right" autoClose={500} />
      <App />
    </Suspense>
  </Provider>
);

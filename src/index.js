import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "macro-css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

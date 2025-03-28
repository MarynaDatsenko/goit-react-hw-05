import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App/App";
import "modern-normalize";
import "./index.css";
import { BrowserRouter } from "react-router";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

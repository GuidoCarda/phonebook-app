import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalConfirmProvider } from "./context/ModalConfirmContext";
import ThemeProvider from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalConfirmProvider>
        <App />
      </ModalConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ActiveComponentProvider } from "./assets/Header/ActiveComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ActiveComponentProvider>
      <Toaster />
      <App />
    </ActiveComponentProvider>
  </React.StrictMode>
);

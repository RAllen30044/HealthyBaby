import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ActiveComponentProvider } from "./assets/HealthyBabySite/Header/ActiveComponentProvider.tsx";
import { HistoryIDComponentProvider } from "./HistoryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HistoryIDComponentProvider>
      <ActiveComponentProvider>
        <Toaster />
        <App />
      </ActiveComponentProvider>
    </HistoryIDComponentProvider>
  </React.StrictMode>
);

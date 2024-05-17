// import { useEffect, useState } from "react";

import "./responsive.css";
import { HealthyBabySite } from "./assets/HealthyBabySite/HealthyBabySite";

import { TimeInfoProvider } from "./assets/HomePage/TimeInfo/TimeInfoProvider";
import { AuthProvider } from "./assets/HealthyBabySite/LandingPage/authProvider";
import { ChildInfoProvider } from "./assets/HomePage/ChildPage/ChildInfoProvider";
import { HistoryIDComponentProvider } from "./HistoryProvider";
import { ActiveComponentProvider } from "./assets/HealthyBabySite/Header/ActiveComponentProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <HistoryIDComponentProvider>
          <ActiveComponentProvider>
            <ChildInfoProvider>
              <TimeInfoProvider>
                <HealthyBabySite />
              </TimeInfoProvider>
            </ChildInfoProvider>
          </ActiveComponentProvider>{" "}
        </HistoryIDComponentProvider>
      </AuthProvider>
    </>
  );
}
export default App;

// import { useEffect, useState } from "react";

import "./responsive.css";
import { HealthyBabySite } from "./assets/HealthyBabySite/HealthBabySite";



import { TimeInfoProvider } from "./assets/HomePage/TimeInfo/TimeInfoProvider";
import { AuthProvider } from "./assets/HealthyBabySite/LandingPage/authProvider";
import { ChildInfoProvider } from "./assets/HomePage/ChildPage/ChildInfoProvider";

function App() {
  return (
    <>
     
        <AuthProvider>
          <ChildInfoProvider>
            <TimeInfoProvider>
              <HealthyBabySite />
            </TimeInfoProvider>
          </ChildInfoProvider>
        </AuthProvider>
      
    </>
  );
}

export default App;

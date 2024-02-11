// import { useEffect, useState } from "react";

import "./responsive.css";
import { HealthyBabySite } from "./assets/HealthyBabySite/HealthBabySite";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage } from "./assets/HomePage/HomePage";
import { CreateProfilePage } from "./assets/HealthyBabySite/ProfilePage/CreateProfilePage";
import { AboutPage } from "./assets/HealthyBabySite/AboutPage/AboutPage";
import { AuthenticationPage } from "./assets/HealthyBabySite/authenticationPage/authentiction";

import { TimeInfoProvider } from "./assets/HomePage/TimeInfo/TimeInfoProvider";
import { AuthProvider } from "./assets/HealthyBabySite/authenticationPage/authProvider";
import { ChildInfoProvider } from "./assets/HomePage/ChildPage/ChildInfoProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ChildInfoProvider>
            <TimeInfoProvider>
              <Routes>
                <Route path="/" element={<HealthyBabySite />}>
                  <Route path="profile" element={<CreateProfilePage />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="auth" element={<AuthenticationPage />} />
                </Route>
              </Routes>
            </TimeInfoProvider>
          </ChildInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

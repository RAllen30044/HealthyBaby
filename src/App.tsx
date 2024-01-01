// import { useEffect, useState } from "react";

import "./App.css";
import { HealthyBabySite } from "./assets/HealthyBabySite/HealthBabySite";

import {

  Route,

  BrowserRouter,
  Routes,
} from "react-router-dom";
import { HomePage } from "./assets/HomePage/HomePage";
import { ProfilePage } from "./assets/HealthyBabySite/ProfilePage/ProfilePage";
import { AboutPage } from "./assets/HealthyBabySite/AboutPage/AboutPage";
import { AuthenticationPage } from "./assets/HealthyBabySite/authenticationPage/authentiction";

import { TimeInfoProvider } from "./assets/HomePage/TimeInfo/TimeInfo";
import { AuthProvider } from "./assets/HealthyBabySite/authenticationPage/authProvider";
import { useEffect } from "react";
import { baseUrl } from "./Types";

function App() {
  return (
    <>
      <BrowserRouter >
        <AuthProvider>
          <TimeInfoProvider>
            <Routes>
              <Route path="/" element={<HealthyBabySite />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="auth" element={<AuthenticationPage />} />
              </Route>
            </Routes>
          </TimeInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

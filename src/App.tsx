// import { useEffect, useState } from "react";

import "./App.css";
import { HealthyBabySite } from "./assets/HealthyBabySite/HealthBabySite";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { HomePage } from "./assets/HomePage/HomePage";
import { ProfilePage } from "./assets/HealthyBabySite/ProfilePage/ProfilePage";
import { AboutPage } from "./assets/HealthyBabySite/AboutPage/AboutPage";
import { AuthenticationPage } from "./assets/HealthyBabySite/authenticationPage/authentiction";

import { TimeInfoProvider } from "./assets/HomePage/TimeInfo/TimeInfo";
import { AuthProvider } from "./assets/HealthyBabySite/authenticationPage/authProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HealthyBabySite />}>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="auth" element={<AuthenticationPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthProvider>
        <TimeInfoProvider>
          <RouterProvider router={router} />
        </TimeInfoProvider>
      </AuthProvider>
    </>
  );
}

export default App;

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HealthyBabySite />}>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

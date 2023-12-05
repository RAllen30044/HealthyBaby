// import { useEffect, useState } from "react";

import "./App.css";

import { AuthenticationPage } from "./assets/authenticationPage/authentiction";
import { ProfilePage } from "./assets/ProfilePage/ProfilePage";
import { ChildPage } from "./assets/HomePage/ChildPage/ChildPage";
import { HomePage } from "./assets/HomePage/HomePage";
import { Header } from "./assets/Header/Header";

function App() {

  return (
    <>
    <Header/>
      {/* <AuthenticationPage/> */}
      {/* <ProfilePage/>  */}
      {/* <ChildPage /> */}
      <HomePage />
    </>
  );
}

export default App;

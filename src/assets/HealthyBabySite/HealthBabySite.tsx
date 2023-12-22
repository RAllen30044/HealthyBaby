import { Header } from "./Header/Header";
import "./HealthyBabySite.css";
import { Outlet } from "react-router-dom";

export const HealthyBabySite = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

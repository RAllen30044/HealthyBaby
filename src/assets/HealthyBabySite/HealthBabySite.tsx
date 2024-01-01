import { useEffect } from "react";
import { Header } from "./Header/Header";
import "./HealthyBabySite.css";
import { Outlet, useNavigate } from "react-router-dom";

export const HealthyBabySite = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

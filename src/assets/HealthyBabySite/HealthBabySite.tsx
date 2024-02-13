import { Header } from "./Header/Header";
import "./HealthyBabySite.css";
import { Outlet } from "react-router-dom";
import { useAuthProviderContext } from "./authenticationPage/authProvider";

export const HealthyBabySite = () => {
  const { landingPage, maybeUser } = useAuthProviderContext();
  return (
    <>
      <Header />
      <main>
        <div
          className={`landingPage ${
            landingPage === "off" || maybeUser ? "hidden" : ""
          }`}
        >
          <h1> Healthy Baby</h1>
        </div>
        <Outlet />
      </main>
    </>
  );
};

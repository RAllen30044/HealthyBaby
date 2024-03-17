import { Header } from "./Header/Header";
import "./HealthyBabySite.css";

import { HomePage } from "../HomePage/HomePage";
import { useActiveComponent } from "./Header/ActiveComponentProvider";
import { AddChildPage } from "../HomePage/ChildPage/AddChildPage";
import { EditChildPage } from "../HomePage/ChildPage/EditChildPage";
import { EditProfilePage } from "./ProfilePage/EditProfilePage";
import { AboutPage } from "./AboutPage/AboutPage";
import { SignUpPage } from "./ProfilePage/SignUpPage";
import { LandingPage } from "./LandingPage/LandingPage";
import { useChildInfo } from "../HomePage/ChildPage/ChildInfoProvider";

export const HealthyBabySite = () => {
  const { activeMainComponent } = useActiveComponent();
  const {
    setChevronPosition,
    chevronPosition,
    hiddenPagesLinks,
    setHiddenPagesLinks,
  } = useChildInfo();
  return (
    <>
      <div
        className="wholePage"
        onClick={() => {
          if (chevronPosition === "up") {
            setChevronPosition("down");
            return;
          }
          if (hiddenPagesLinks === true) {
            setHiddenPagesLinks(false);
            return;
          }
        }}
      >
        <Header />
        <main>
          {activeMainComponent === "landingPage" ? <LandingPage /> : ""}
          {activeMainComponent === "home" ? <HomePage /> : ""}

          {activeMainComponent === "addChild" ? <AddChildPage /> : ""}
          {activeMainComponent === "editChild" ? <EditChildPage /> : ""}
          {activeMainComponent === "editProfile" ? <EditProfilePage /> : ""}
          {activeMainComponent === "about" ? <AboutPage /> : ""}
          {activeMainComponent === "signUp" ? <SignUpPage /> : ""}
        </main>
      </div>
    </>
  );
};

import "./HomePage.css";
import { FeedingPage } from "./FeedingPage/FeedingPage";
import { DiaperPage } from "./DiaperPage/DiaperPage";
import { NappingPage } from "./NappingPage/NappingPage";
import { IllnessPage } from "./IllnessPage/IllnessPage";
import { useActiveComponent } from "../HealthyBabySite/Header/ActiveComponentProvider";

import { setActiveHomePageComponentInLocalStorage } from "../../ErrorHandling";

import { UseTimeInfo } from "./TimeInfo/TimeInfoProvider";

export const HomePage = () => {
  const { activeHomePageComponent, setActiveHomePageComponent } =
    useActiveComponent();
  const { setIsSubmitted } = UseTimeInfo();
  return (
    <>
      <div className={`tabs `}>
        <div className="tabContainer">
          <div
            className={`feedingTab ${
              activeHomePageComponent === "feeding" ? "active" : ""
            }`}
            onClick={() => {
              setIsSubmitted(false);
              setActiveHomePageComponent("feeding");
              setActiveHomePageComponentInLocalStorage("feeding");
            }}
          >
            <p>Feeding</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`diaperTab ${
              activeHomePageComponent === "diaper" ? "active" : ""
            }`}
            onClick={() => {
              setIsSubmitted(false);
              setActiveHomePageComponent("diaper");
              setActiveHomePageComponentInLocalStorage("diaper");
            }}
          >
            <p>Diaper</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`nappingTab ${
              activeHomePageComponent === "napping" ? "active" : ""
            }`}
            onClick={() => {
              setIsSubmitted(false);
              setActiveHomePageComponent("napping");
              setActiveHomePageComponentInLocalStorage("napping"); //
            }}
          >
            <p>Napping</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`illnessTab ${
              activeHomePageComponent === "illness" ? "active" : ""
            }`}
            onClick={() => {
              setIsSubmitted(false);
              setActiveHomePageComponent("illness");
              setActiveHomePageComponentInLocalStorage("illness");
            }}
          >
            <p>Illness</p>
          </div>
        </div>
      </div>
      {activeHomePageComponent === "feeding" ? <FeedingPage /> : ""}
      {activeHomePageComponent === "diaper" ? <DiaperPage /> : ""}
      {activeHomePageComponent === "napping" ? <NappingPage /> : ""}
      {activeHomePageComponent === "illness" ? <IllnessPage /> : ""}
    </>
  );
};

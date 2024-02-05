import "./HomePage.css";
import { FeedingPage } from "./FeedingPage/FeedingPage";
import { DaiperPage } from "./DiaperPage/DiaperPage";
import { NappingPage } from "./NappingPage/NappingPage";
import { IllnessPage } from "./IllnessPage/IllnessPage";
import { useActiveComponent } from "../HealthyBabySite/Header/ActiveComponentProvider";
import { ChildPage } from "./ChildPage/ChildPage";
import { setActiveComponentInLocalStorage } from "../../ErrorHandling";

export const HomePage = () => {
  const { activeComponent, setActiveComponent } = useActiveComponent();
  return (
    <>
      <div className={`tabs ${activeComponent === "addChild" ? "hidden" : ""}`}>
        <div className="tabContainer">
          <div
            className={`feedingTab ${
              activeComponent === "feeding" ? "active" : ""
            }`}
            onClick={() => {
              setActiveComponent("feeding");
              setActiveComponentInLocalStorage("feeding");
            }}
          >
            <p>Feeding</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`diaperTab ${
              activeComponent === "diaper" ? "active" : ""
            }`}
            onClick={() => {
              setActiveComponent("diaper");
              setActiveComponentInLocalStorage("diaper");
            }}
          >
            <p>Diaper</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`nappingTab ${
              activeComponent === "napping" ? "active" : ""
            }`}
            onClick={() => {
              setActiveComponent("napping");
              setActiveComponentInLocalStorage("napping");
            }}
          >
            <p>Napping</p>
          </div>
        </div>
        <div className="tabContainer">
          <div
            className={`illnessTab ${
              activeComponent === "illness" ? "active" : ""
            }`}
            onClick={() => {
              setActiveComponent("illness");
              setActiveComponentInLocalStorage("illness");
            }}
          >
            <p>Illness</p>
          </div>
        </div>
      </div>
      {activeComponent === "feeding" ? <FeedingPage /> : ""}
      {activeComponent === "diaper" ? <DaiperPage /> : ""}
      {activeComponent === "napping" ? <NappingPage /> : ""}
      {activeComponent === "illness" ? <IllnessPage /> : ""}
      {activeComponent === "addChild" ? <ChildPage /> : ""}
    </>
  );
};

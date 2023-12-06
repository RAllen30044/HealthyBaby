import "./HomePage.css";
import { FeedingPage } from "./FeedingPage/FeedingPage";
import { DaiperPage } from "./DiaperPage/DiaperPage";
import { NappingPage } from "./NappingPage/NappingPage";
import { IllnessPage } from "./IllnessPage/IllnessPage";
import { useActiveComponent } from "../HealthyBabySite/Header/ActiveComponent";
import { ChildPage } from "./ChildPage/ChildPage";
export const HomePage = () => {
  const { activeComponent } = useActiveComponent();
  return (
    <>
      {activeComponent === "feeding" ? <FeedingPage /> : ""}
      {activeComponent === "diaper" ? <DaiperPage /> : ""}
      {activeComponent === "napping" ? <NappingPage /> : ""}
      {activeComponent === "illness" ? <IllnessPage /> : ""}
      {activeComponent === "addChild" ? <ChildPage /> : ""}
    </>
  );
};

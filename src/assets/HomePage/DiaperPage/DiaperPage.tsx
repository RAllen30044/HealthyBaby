import { useState } from "react";
import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo } from "../TimeInfo/TimeInfo";
import "./Diaper.css";

type DaiperType = "Wet" | "Poop";
type ConsistancyTypeT = "Pellets" | "Solid" | "Soft" | "Wet";

export const DaiperPage = () => {
  const [diaperType, setDiaperType] = useState<DaiperType>("Wet");
  const [consistancy, setConsistancy] = useState<ConsistancyTypeT>("Wet");

  return (
    <>
      <div className="banner diaperBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Diapers</h1>
          </div>
        </div>
      </div>
      <div className="dataInputForm">
        <form
          action="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TimeInfo />
          <div className="diaperType ">
            <label htmlFor="diaperType">Diaper Type?</label>
            <br />
            <button
              className={`wet button ${
                diaperType === "Wet" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setDiaperType("Wet");
              }}
            >
              Wet
            </button>
            <button
              className={`poop button ${
                diaperType === "Poop" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setDiaperType("Poop");
              }}
            >
              Poop
            </button>
          </div>
          <div
            className={`consistancy ${diaperType === "Wet" ? "hidden" : ""}`}
          >
            <label htmlFor="consistancy">Consistancy?</label>
            <br />
            <button
              className={`soft button ${
                consistancy === "Soft" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Soft");
              }}
            >
              Soft
            </button>
            <button
              className={`solid button ${
                consistancy === "Solid" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Solid");
              }}
            >
              Solid
            </button>
            <button
              className={`pellets button ${
                consistancy === "Pellets" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Pellets");
              }}
            >
              Pellets
            </button>
          </div>
          <div className="saveContainer">
            <button type="submit" className="save diaperSave">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>Diapers History</h1>
        </div>
      </div>
    </>
  );
};

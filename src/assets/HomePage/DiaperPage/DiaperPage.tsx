import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo } from "../TimeInfo/TimeInfo";
import "./Diaper.css";

export const DaiperPage = () => {
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
        <form action="POST">
          <TimeInfo />
          <div className="diaperType ">
            <label htmlFor="diaperType">Diaper Type?</label><br />
            <button className="wet">Wet</button>
            <button className="poop">Poop</button>
          </div>
          <div className="consistancy hidden">
            <label htmlFor="consistancy">Consistancy?</label><br />
            <button className="soft">soft</button>
            <button className="hard">hard</button>
            <button className="hard">pellets</button>
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

import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./IllnessPage.css";
import { TimeInfo } from "../TimeInfo/TimeInfo";
export const IllnessPage = () => {
  return (
    <>
      <div className="banner illnessBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Illness</h1>
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
          <div className="sickness">
            <label htmlFor="sickness">Sickness: </label>
            <input type="text" id="sickness" />
          </div>
          <div className="symptoms">
            <label htmlFor="symptoms">Symptoms: </label>
            <input type="text" id="symptoms" />
          </div>
          <div className="medicineGiven">
            <label htmlFor="medicineGiven">Medicine given: </label>
            <input type="text" id="medicineGiven" />
          </div>
          <div className="oz">
            <label htmlFor="oz">Oz: </label>
            <input type="text" id="oz" />
          </div>
          <div className="saveContainer">
            <button type="submit" className="save illnessSave">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>Illness History</h1>
        </div>
      </div>
    </>
  );
};

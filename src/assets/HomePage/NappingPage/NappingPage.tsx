import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo } from "../TimeInfo/TimeInfo";
import "./NappingPage.css";

export const NappingPage = () => {
  return (
    <>
      <div className="banner nappingBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Napping</h1>
          </div>
          
        </div>
      </div>
      <div className="dataInputForm">
        <form action="POST">
          <TimeInfo />
          <div className="napLength ">
            <label htmlFor="napLength">Nap Length:</label>
           <input type="text" name="napLength" id="napLength" />
          </div>
  
          <div className="saveContainer">
            <button type="submit" className="save nappingSave">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>Napping History</h1>
        </div>
      </div>
    </>
  );
};

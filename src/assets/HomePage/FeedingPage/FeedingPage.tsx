import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./FeedingPage.css";

export const FeedingPage = () => {
  return (
    <>
      <div className="banner feedingBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Feeding</h1>
          </div>
          <div className="subCategories ">
            <button className="breastFeed">breast feed</button>
            <button className="bottleFeed">bottle feed</button>
          </div>
        </div>
      </div>
      <div className="dataInputForm">
        <form action="POST">
          <div className="time">
            <label htmlFor="time">Time:</label>
            <input type="text" id="time" />
          </div>
          <div className="date">
            <label htmlFor="date">Date:</label>
            <input type="text" id="date" />
          </div>
          <div className="oz">
            <label htmlFor="oz">Bottle oz:</label>
            <input type="text" id="time" />
          </div>
          <div className="ozDiscarded">
            <label htmlFor="">Oz. discarded:</label>
            <input type="text" id="ozDiscarded" />
          </div>
          <div className="feedingTime hidden">
            <label htmlFor="">How much time was feeding:</label>
            <input type="text" id="feedingTime" />
          </div>
          <div className="saveContainer">
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>Feeding History</h1>
        </div>
      </div>
    </>
  );
};

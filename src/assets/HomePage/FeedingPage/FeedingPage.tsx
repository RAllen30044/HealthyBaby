import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./FeedingPage.css";
import { TimeInfo } from "../TimeInfo/TimeInfo";
import { useState } from "react";
type FeedingType = "breastFeed" | "bottleFeed";

export const FeedingPage = () => {
  const [feed, setFeed] = useState<FeedingType>("bottleFeed");
  return (
    <>
      <div className="banner feedingBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Feeding</h1>
          </div>
          <div className="subCategories ">
            <button
              className="breastFeed"
              onClick={() => setFeed("breastFeed")}
            >
              breast feed
            </button>
            <button
              className="bottleFeed"
              onClick={() => setFeed("bottleFeed")}
            >
              bottle feed
            </button>
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
          <div
            className={`bottleFeedInput ${
              feed === "bottleFeed" ? "" : "hidden"
            }`}
          >
            <div className="oz">
              <label htmlFor="oz">Bottle oz:</label>
              <input type="text" id="time" />
            </div>
            <div className="ozDiscarded">
              <label htmlFor="">Oz. discarded:</label>
              <input type="text" id="ozDiscarded" />
            </div>
          </div>
          <div
            className={`breatFeedingInput ${
              feed === "breastFeed" ? "" : "hidden"
            }`}
          >
            <div className="feedingTime ">
              <label htmlFor="">How much time was feeding:</label>
              <input type="text" id="feedingTime" />
            </div>
          </div>
          <div className="saveContainer">
            <button type="submit" className="save feedingSave">
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

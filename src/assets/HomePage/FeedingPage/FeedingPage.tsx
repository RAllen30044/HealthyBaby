import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./FeedingPage.css";
import { TimeInfo, useTimeInfo } from "../TimeInfo/TimeInfo";
import {  useState } from "react";

import { BreastFeedingHistory } from "./BreastFeedingHistory";
import { BottleFeedingHistory } from "./BottleFeedingHistory";

import {
  bottleFeedingHistoryUrl,
  breastFeedingHistoryUrl,
  deleteHistoryInfo,
  postInfo,
} from "../../../api";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { convertToStandardTime, formatDate } from "../TimeInfo/TimeConversion";

type FeedingType = "breastFeed" | "bottleFeed";

export const FeedingPage = () => {
  const [feed, setFeed] = useState<FeedingType>("bottleFeed");

  const [oz, setOz] = useState("");
  const [ozLeft, setOzLeft] = useState("");
  const [feedingTimeLength, setfeedingTimeLength] = useState("");

  const { time, date, setDate, setTime, loading, setLoading } = useTimeInfo();
  const {
    bottleFeedHistory,
    breastFeedHistory,
    setBreastFeedHistory,
    setBottleFeedHistory,
    fetchBottleFeedingData,
    fetchBreastFeedingData,
  } = useHistoryIDComponent();

  const removeBreastFeedingHistory = (id: number) => {
    const updateData = breastFeedHistory.filter((history) => history.id !== id);

    setBreastFeedHistory(updateData);

    deleteHistoryInfo(breastFeedingHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setBreastFeedHistory(breastFeedHistory);
      } else return;
    });
  };
  const removeBottleFeedingHistory = (id: number) => {
    const updateData = bottleFeedHistory.filter((history) => history.id !== id);

    setBottleFeedHistory(updateData);

    deleteHistoryInfo(bottleFeedingHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setBreastFeedHistory(breastFeedHistory);
      } else return;
    });
  };

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
              className={`breastFeed  button ${
                feed === "breastFeed" ? "pressedButton" : ""
              }`}
              onClick={() => setFeed("breastFeed")}
            >
              breast feed
            </button>
            <button
              className={`bottleFeed button ${
                feed === "bottleFeed" ? "pressedButton" : ""
              }  `}
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
            setLoading(true);
            if (feed === "bottleFeed") {
              return postInfo(
                {
                  time: convertToStandardTime(time),
                  date: date,
                  oz: oz,
                  ozLeft: ozLeft,
                },
                bottleFeedingHistoryUrl
              )
                .then(fetchBottleFeedingData)
                .then(() => {
                  setTime("");
                  setOz("");
                  setOzLeft("");
                  setDate("");
                })
                .then(() => {
                  setLoading(false);
                });
            }
            return postInfo(
              {
                time: convertToStandardTime(time),
                date: formatDate(date),
                feedingTimeLength: feedingTimeLength,
              },
              breastFeedingHistoryUrl
            )
              .then(fetchBreastFeedingData)
              .then(() => {
                setDate("");
                setTime("");
                setfeedingTimeLength("");
              })
              .then(() => {
                setLoading(false);
              });
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
              <input
                type="text"
                id="time"
                value={oz}
                onChange={(e) => {
                  e.preventDefault();
                  setOz(e.target.value);
                }}
              />
            </div>
            <div className="ozDiscarded">
              <label htmlFor="">Oz. discarded:</label>
              <input
                type="text"
                id="ozDiscarded"
                value={ozLeft}
                onChange={(e) => {
                  e.preventDefault();
                  setOzLeft(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            className={`breatFeedingInput ${
              feed === "breastFeed" ? "" : "hidden"
            }`}
          >
            <div className="feedingTime ">
              <label htmlFor="">How much time was feeding:</label>
              <input
                type="text"
                id="feedingTime"
                value={feedingTimeLength}
                onChange={(e) => {
                  e.preventDefault();
                  setfeedingTimeLength(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="saveContainer">
            <button
              type="submit"
              className="save feedingSave"
              disabled={loading}
            >
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
      <div className="historyTimelineContainer">
        {feed === "breastFeed" ? (
          <BreastFeedingHistory
            breastFeedHistory={breastFeedHistory}
            removeBreastFeedingHistory={removeBreastFeedingHistory}
          />
        ) : (
          <BottleFeedingHistory
            bottleFeedHistory={bottleFeedHistory}
            removeBottleFeedingHistory={removeBottleFeedingHistory}
          />
        )}
      </div>
    </>
  );
};

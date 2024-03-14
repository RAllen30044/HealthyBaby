import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./FeedingPage.css";

import {
  TimeInfo,
  dateBeforeBirthMessage,
  useTimeInfo,
} from "../TimeInfo/TimeInfoProvider";
import { useState } from "react";

import { BreastFeedingHistory } from "./BreastFeedingHistory";
import { BottleFeedingHistory } from "./BottleFeedingHistory";

import {
  bottleFeedingHistoryUrl,
  breastFeedingHistoryUrl,
  deleteHistoryInfo,
  infantFeedingHistoryUrl,
  postInfo,
} from "../../../api";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  convertToStandardTime,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import { InfantFeedingHistory } from "./InfantFeedingHistory";
import {
  babyNameForHistory,
  futureTimeNotAllowed,
  isDateBeforeBirth,
  onlyKeyNumbers,
  onlyNumbersWithDecimal,
  preventKeyingNumbers,
  timeInvaild,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";

type FeedingType = "breastFeed" | "bottleFeed" | "infantModeOff";
type InfantModeType = "on" | "off";

export const FeedingPage = () => {
  const [feed, setFeed] = useState<FeedingType>("bottleFeed");
  const [infantMode, setInfantMode] = useState<InfantModeType>("on");
  const [oz, setOz] = useState("");
  const [ozLeft, setOzLeft] = useState("");
  const [feedingTimeLength, setfeedingTimeLength] = useState("");
  const [drinkType, setDrinkType] = useState("");
  const [foodType, setFoodType] = useState("");

  const {
    time,
    setTime,
    date,
    setDate,
    loading,
    setLoading,
    setIsSubmitted,
    shouldShowDateTimeEntryError,
    shouldShowDateBeforeBirthError,
  } = useTimeInfo();
  const {
    bottleFeedHistory,
    breastFeedHistory,
    infantFeedHistory,
    setInfantFeedHistory,
    setBreastFeedHistory,
    setBottleFeedHistory,
    fetchBottleFeedingData,
    fetchBreastFeedingData,
    fetchInfantFeedingData,
    childId,
  } = useHistoryIDComponent();

  const { maybeChild } = useAuthProviderContext();
  const removeBreastFeedingHistory = (id: string) => {
    const updateData = breastFeedHistory.filter((history) => history.id !== id);

    setBreastFeedHistory(updateData);

    deleteHistoryInfo(breastFeedingHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setBreastFeedHistory(breastFeedHistory);
      } else return;
    });
  };
  const removeBottleFeedingHistory = (id: string) => {
    const updateData = bottleFeedHistory.filter((history) => history.id !== id);

    setBottleFeedHistory(updateData);

    deleteHistoryInfo(bottleFeedingHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setBreastFeedHistory(breastFeedHistory);
      } else return;
    });
  };
  const removeInfantFeedingHistory = (id: string) => {
    const updateData = infantFeedHistory.filter((history) => history.id !== id);

    setInfantFeedHistory(updateData);

    deleteHistoryInfo(infantFeedingHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setInfantFeedHistory(infantFeedHistory);
      } else return;
    });
  };

  const getChild = localStorage.getItem("child");
  const getGender = getChild ? JSON.parse(getChild)?.gender : "";

  return (
    <>
      <div className="banner feedingBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>
              {infantMode === "off"
                ? "Eating"
                : `${feed === "bottleFeed" ? "Bottle" : "Breast"} Feeding`}
            </h1>
          </div>
          <div className={`feedingOffSwitch `}>
            <button
              className={`infantModeSwitch button `}
              onClick={() => {
                if (infantMode === "on") {
                  setInfantMode("off");
                  setFeed("infantModeOff");
                  setDate("");
                  setTime("");
                }
                if (infantMode === "off") {
                  setInfantMode("on");
                  setFeed("bottleFeed");
                  setDate("");
                  setTime("");
                }
              }}
            >
              {infantMode === "off" ? "Baby Feeding" : "Eating "}
              {infantMode === "off" ? (
                <i className="fa-solid fa-baby"></i>
              ) : (
                <i
                  className={`fa-solid fa-child-${
                    getGender.toLowerCase() === "female" ? `dress` : `reaching`
                  }`}
                ></i>
              )}
            </button>
          </div>
          <div
            className={`subCategories ${infantMode === "on" ? "" : "hidden"} `}
          >
            <button
              className={`breastFeed  button ${
                feed === "breastFeed" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setFeed("breastFeed");
                setDate("");
                setTime("");
              }}
            >
              <h2>🤱 </h2>
              <p>
                <strong> Breast</strong>
              </p>
            </button>
            <button
              className={`bottleFeed button ${
                feed === "bottleFeed" ? "pressedButton" : ""
              }  `}
              onClick={() => {
                setFeed("bottleFeed");
                setDate("");
                setTime("");
              }}
            >
              <h2>🍼 </h2>
              <p>
                <strong>Bottle</strong>
              </p>
            </button>
          </div>
        </div>
      </div>

      <section className="historySection">
        <div className="dataInputForm feedingForm">
          <div className="dataInputFormContainer">
            <h2 className="addHistoryText">Add History</h2>

            <form
              action="POST"
              onSubmit={(e) => {
                e.preventDefault();
                if (timeInvaild(date, time)) {
                  setIsSubmitted(true);
                  return;
                }
                if (
                  maybeChild &&
                  isDateBeforeBirth(JSON.parse(maybeChild).DOB, date)
                ) {
                  setIsSubmitted(true);
                  return;
                }

                setIsSubmitted(false);

                setLoading(true);
                if (feed === "bottleFeed") {
                  return postInfo(
                    {
                      time: convertToStandardTime(time),
                      date: formatDate(createShortHandDate(date)),
                      bottleOz: oz,
                      bottleOzLeft: ozLeft,
                      childId: childId,
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
                if (feed === "breastFeed") {
                  return postInfo(
                    {
                      time: convertToStandardTime(time),
                      date: formatDate(createShortHandDate(date)),
                      feedingTimeLength: feedingTimeLength,
                      childId: childId,
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
                }
                if (feed === "infantModeOff") {
                  return postInfo(
                    {
                      time: convertToStandardTime(time),
                      date: formatDate(createShortHandDate(date)),
                      drinkType: drinkType,
                      foodType: foodType,
                      childId: childId,
                    },
                    infantFeedingHistoryUrl
                  )
                    .then(fetchInfantFeedingData)
                    .then(() => {
                      setDate("");
                      setTime("");
                      setDrinkType("");
                      setFoodType("");
                    })
                    .then(() => {
                      setLoading(false);
                    });
                }
              }}
            >
              <TimeInfo />{" "}
              {shouldShowDateTimeEntryError && (
                <ErrorMessage message={futureTimeNotAllowed} show={true} />
              )}
              {shouldShowDateBeforeBirthError && (
                <ErrorMessage message={dateBeforeBirthMessage} show={true} />
              )}
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
                      setOz(onlyNumbersWithDecimal(e.target.value));
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
                      setOzLeft(onlyNumbersWithDecimal(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div
                className={`breastFeedingInput ${
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
                      setfeedingTimeLength(onlyKeyNumbers(e.target.value));
                    }}
                  />
                  <span> min.</span>
                </div>
              </div>
              <div
                className={`breastFeedingInput ${
                  feed === "infantModeOff" ? "" : "hidden"
                }`}
              >
                <div className="drinkType">
                  <label htmlFor="">Drink:</label>
                  <input
                    type="text"
                    id="DrinkType"
                    value={drinkType}
                    onChange={(e) => {
                      e.preventDefault();
                      setDrinkType(preventKeyingNumbers(e.target.value));
                    }}
                  />
                </div>
                <div className="foodType ">
                  <label htmlFor="">Food: </label>
                  <input
                    type="text"
                    id="foodType"
                    value={foodType}
                    onChange={(e) => {
                      e.preventDefault();
                      setFoodType(preventKeyingNumbers(e.target.value));
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
        </div>
        <div className="historyInformationContainer">
          <div className="historyHeaderContainer">
            <div className="categoryName historyHeader">
              <h1>{babyNameForHistory()}'s History</h1>
            </div>
          </div>

          {feed === "breastFeed" ? (
            <BreastFeedingHistory
              breastFeedHistory={breastFeedHistory}
              removeBreastFeedingHistory={removeBreastFeedingHistory}
            />
          ) : (
            ""
          )}
          {feed === "bottleFeed" ? (
            <BottleFeedingHistory
              bottleFeedHistory={bottleFeedHistory}
              removeBottleFeedingHistory={removeBottleFeedingHistory}
            />
          ) : (
            ""
          )}
          {feed === "infantModeOff" ? (
            <InfantFeedingHistory
              infantFeedHistory={infantFeedHistory}
              removeInfantFeedingHistory={removeInfantFeedingHistory}
            />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

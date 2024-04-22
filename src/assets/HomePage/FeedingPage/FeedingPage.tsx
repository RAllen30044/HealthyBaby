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
  mealHistoryUrl,
  postInfo,
} from "../../../../clientApi";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  convertToStandardTime,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import { EatingHistory} from "./MealHistory";
import {
  babyNameForHistory,
  futureTimeNotAllowed,
  isDateBeforeBirth,
  onlyKeyNumbers,
  onlyNumbersWithDecimal,
  preventKeyingNumbers,
  timeInvalid,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import { useChildInfo } from "../ChildPage/ChildInfoProvider";

type FeedingType = "breastFeed" | "bottleFeed" | "infantModeOff";
type InfantModeType = "on" | "off";

export const FeedingPage = () => {
  const [feed, setFeed] = useState<FeedingType>(
    JSON.parse(JSON.stringify(localStorage.getItem("feed"))) || "bottleFeed"
  );
  const [infantMode, setInfantMode] = useState<InfantModeType>(
    JSON.parse(JSON.stringify(localStorage.getItem("infantMode"))) || "on"
  );
  const [quantity, setQuantity] = useState("");
  const [quantityLeft, setQuantityLeft] = useState("");
  const [feedingTimeLength, setfeedingTimeLength] = useState("");
  const [drinkType, setDrinkType] = useState("");
  const [foodType, setFoodType] = useState("");
  const { unitOfMeasurement, setUnitOfMeasurement } = useChildInfo();
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
    mealHistory,
    setMealHistory,
    setBreastFeedHistory,
    setBottleFeedHistory,
    fetchBottleFeedingData,
    fetchBreastFeedingData,
    fetchMealData,
    childId,
  } = useHistoryIDComponent();

  const { maybeChild } = useAuthProviderContext();
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
  const removeMealHistory = (id: number) => {
    const updateData = mealHistory.filter((history) => history.id !== id);

    setMealHistory(updateData);

    deleteHistoryInfo(mealHistoryUrl, id).then((res) => {
      if (!res.ok) {
        setMealHistory(mealHistory);
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
                ? "Meal"
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
                  localStorage.setItem("feed", "infantModeOff");
                  localStorage.setItem("infantMode", "off");
                  setDate("");
                  setTime("");
                }
                if (infantMode === "off") {
                  setInfantMode("on");
                  setFeed("bottleFeed");
                  localStorage.setItem("feed", "bottleFeed");
                  localStorage.setItem("infantMode", "on");
                  setDate("");
                  setTime("");
                }
              }}
            >
              {infantMode === "off" ? "Baby Feeding" : "Meals"}
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
                localStorage.setItem("feed", "breastFeed");
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
                localStorage.setItem("feed", "bottleFeed");
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
                if (timeInvalid(date, time)) {
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
                      bottleQuantity: `${quantity} ${unitOfMeasurement} `,
                      bottleQuantityLeft:
                        parseInt(quantityLeft) > 0
                          ? ` ${quantityLeft} ${unitOfMeasurement}`
                          : "0",
                      childId: childId,
                    },
                    bottleFeedingHistoryUrl
                  )
                    .then(fetchBottleFeedingData)
                    .then(() => {
                      setTime("");
                      setQuantity("");
                      setQuantityLeft("");
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
                    mealHistoryUrl
                  )
                    .then(fetchMealData)
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
                <div className={`unitOfMeasurementButtons`}>
                  <label htmlFor="unitOfMeasurement">Unit of Measurement</label>
                  <button
                    type="button"
                    className={`mLButton  ${
                      unitOfMeasurement === "mL" ? "pressedButton" : ""
                    }`}
                    onClick={() => {
                      setUnitOfMeasurement("mL");
                      localStorage.setItem("unitOfMeasurement", "mL");
                    }}
                  >
                    mL
                  </button>
                  <button
                    type="button"
                    className={`ozButton ${
                      unitOfMeasurement === "oz" ? "pressedButton" : ""
                    }`}
                    onClick={() => {
                      setUnitOfMeasurement("oz");
                      localStorage.setItem("unitOfMeasurement", "oz");
                    }}
                  >
                    oz
                  </button>
                </div>
                <div className="quantity">
                  <label htmlFor="quantity">Bottle Quantity:</label>
                  <input
                    type="text"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => {
                      e.preventDefault();
                      setQuantity(onlyNumbersWithDecimal(e.target.value));
                    }}
                  />
                  <div className="unitOfMeasurementText">
                    {unitOfMeasurement}
                  </div>
                </div>
                <div className="quantityDiscarded">
                  <label htmlFor="">Quantity Discarded:</label>
                  <input
                    type="text"
                    id="quantityDiscarded"
                    value={quantityLeft}
                    onChange={(e) => {
                      e.preventDefault();
                      setQuantityLeft(onlyNumbersWithDecimal(e.target.value));
                    }}
                  />
                  <div className="unitOfMeasurementText">
                    {unitOfMeasurement}
                  </div>
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
            <EatingHistory
              eatingHistory={mealHistory}
              removeEatingHistory={removeMealHistory}
            />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

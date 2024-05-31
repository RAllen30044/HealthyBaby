import { ChildInfo } from "../ChildInfo/ChildInfo";
import {
  TimeInfo,
  dateBeforeBirthMessage,
  UseTimeInfo,
} from "../TimeInfo/TimeInfoProvider";

import { useState } from "react";
import "./NappingPage.css";

import { deleteHistoryInfo, nappingUrl, postInfo } from "../../../../callApis";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import {
  convertToStandardTime,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import {
  babyNameForHistory,
  futureTimeNotAllowed,
  getChildDOB,
  isDateNotBeforeBirth,
  isEntryNotANumber,
  numberErrorMessage,
  onlyKeyNumbers,
  timeInvalid,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
// import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import {
  HistoryDeleteIconColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const NappingPage = () => {
  const [lengthOfTime, setLengthOfTime] = useState("");
  const {
    time,
    setTime,
    date,
    setDate,
    loading,
    setLoading,
    setIsSubmitted,
    isSubmitted,
    shouldShowDateTimeEntryError,
    shouldShowDateBeforeBirthError,
  } = UseTimeInfo();

  const {
    nappingHistory,
    setNappingHistory,
    fetchNappingHistory,
    profileChildren,
    childId,
  } = UseHistoryIDComponent();

  const removeNappingHistory = (id: number) => {
    const updateData = nappingHistory.filter((history) => history.id !== id);
    setNappingHistory(updateData);

    deleteHistoryInfo(nappingUrl, id).then((res) => {
      if (!res.ok) {
        setNappingHistory(nappingHistory);
      } else return;
    });
  };

  const shouldShowNumberErrorMessage =
    isSubmitted && isEntryNotANumber(lengthOfTime);

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

      <section className="historySection">
        <div className="dataInputForm">
          <div className="dataInputFormContainer">
            <h2 className="addHistoryText">Add History</h2>

            <form
              action="POST"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(isEntryNotANumber(lengthOfTime));

                if (
                  isDateNotBeforeBirth(
                    getChildDOB(profileChildren, childId),
                    date
                  ) ||
                  timeInvalid(date, time) ||
                  isEntryNotANumber(lengthOfTime)
                ) {
                  setIsSubmitted(true);
                  return;
                }
                setIsSubmitted(false);
                setLoading(true);
                postInfo(
                  {
                    time: convertToStandardTime(time),
                    date: formatDate(createShortHandDate(date)),
                    lengthOfTime: lengthOfTime,
                    childId,
                  },
                  nappingUrl
                )
                  .then(fetchNappingHistory)
                  .then(() => {
                    setTime("");
                    setDate("");
                    setLengthOfTime("");
                  })
                  .then(() => {
                    setLoading(false);
                  });
              }}
            >
              <TimeInfo />
              {shouldShowDateTimeEntryError && (
                <ErrorMessage message={futureTimeNotAllowed} show={true} />
              )}
              {shouldShowDateBeforeBirthError && (
                <ErrorMessage message={dateBeforeBirthMessage} show={true} />
              )}
              <div className="napLength ">
                <label htmlFor="napLength">Nap Length:</label>
                <input
                  type="text"
                  name="napLength"
                  id="napLength"
                  className="homeInput"
                  value={lengthOfTime}
                  onChange={(e) => {
                    setLengthOfTime(onlyKeyNumbers(e.target.value));
                  }}
                />
                <span> min</span>
              </div>
              {shouldShowNumberErrorMessage && (
                <ErrorMessage message={numberErrorMessage} show={true} />
              )}
              <div className="saveContainer">
                <button
                  type="submit"
                  className="save nappingSave"
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

          <section className="largeScreenHistorySection">
            <div className="historyTable">
              {HistoryTableHeader(
                ["Date", "Time", "Nap Length of time", "Delete"],
                "Napping"
              )}
              <div className="historyTimelineContainer ">
                {HistoryInfoColumn(nappingHistory, "date", "", "Napping")}

                {HistoryInfoColumn(nappingHistory, "time", "", "Napping")}

                {HistoryInfoColumn(
                  nappingHistory,
                  "lengthOfTime",
                  "min",
                  "Napping"
                )}

                {HistoryDeleteIconColumn(
                  nappingHistory,
                  "Napping",
                  removeNappingHistory
                )}
              </div>
            </div>
          </section>

          <section className="smallerScreenHistorySection">
            <div className="smallerScreenHistoryTable">
              {HistoryMobileView(
                nappingHistory,
                ["lengthOfTime"],
                ["Nap Time(min)"],
                ["min"],
                "Napping",
                removeNappingHistory
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

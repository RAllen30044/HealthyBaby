import { ChildInfo } from "../ChildInfo/ChildInfo";
import {
  TimeInfo,
  dateBeforeBirthMessage,
  useTimeInfo,
} from "../TimeInfo/TimeInfoProvider";

import { useState } from "react";
import "./NappingPage.css";

import { deleteHistoryInfo, nappingUrl, postInfo } from "../../../api";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  convertToStandardTime,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import {
  babyNameForHistory,
  futureTimeNotAllowed,
  isDateBeforeBirth,
  onlyKeyNumbers,
  timeInvaild,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import {
  HistoryDateAndTimeColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const NappingPage = () => {
  const [LengthOfTime, setLengthOfTime] = useState("");
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

  const { maybeChild } = useAuthProviderContext();
  const { nappingHistory, setNappingHistory, fetchNappingHistory, childId } =
    useHistoryIDComponent();
  console.log(nappingHistory);

  const removeNappingHistory = (id: string) => {
    const updateData = nappingHistory.filter((history) => history.id !== id);
    setNappingHistory(updateData);

    deleteHistoryInfo(nappingUrl, id).then((res) => {
      if (!res.ok) {
        setNappingHistory(nappingHistory);
      } else return;
    });
  };

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
                postInfo(
                  {
                    time: convertToStandardTime(time),
                    date: formatDate(createShortHandDate(date)),
                    lengthOfTime: LengthOfTime,
                    childId: childId,
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
                  value={LengthOfTime}
                  onChange={(e) => {
                    setLengthOfTime(onlyKeyNumbers(e.target.value));
                  }}
                />
                <span> min</span>
              </div>
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
            {HistoryTableHeader(["Nap Legnth of time"], "Napping")}
            <div className="historyTimelineContainer ">
              {HistoryDateAndTimeColumn(
                nappingHistory,
                "Napping",
                removeNappingHistory
              )}
              <div>
                {HistoryInfoColumn(
                  nappingHistory,
                  "lengthOfTime",
                  "min",
                  "Napping"
                )}
              </div>
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

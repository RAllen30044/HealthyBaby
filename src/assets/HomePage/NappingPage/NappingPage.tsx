import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo, useTimeInfo } from "../TimeInfo/TimeInfo";

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
  onlyKeyNumbers,
  timeInvaild,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";

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
  } = useTimeInfo();

  const { nappingHistory, setNappingHistory, fetchNappingHistory, childId } =
    useHistoryIDComponent();

  const removeNappingHistory = (id: number) => {
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
      <div className="dataInputForm">
        <form
          action="POST"
          onSubmit={(e) => {
            e.preventDefault();
            if (timeInvaild(date, time)) {
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
          {shouldShowDateTimeEntryError && (
            <ErrorMessage message={futureTimeNotAllowed} show={true} />
          )}

          <TimeInfo />
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
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>{babyNameForHistory()}'s Napping History</h1>
        </div>
      </div>
      <div className="historyTimelineContainer">
        {nappingHistory
          .filter((history) => history.childId === childId)
          .sort((b, a) => {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }

            return 0;
          })
          .map((history) => {
            return (
              <div className="historyContainer" key={history.id}>
                <div className="nappingHistory">
                  <h3>Time: {history.time}</h3>
                  <h3>Date: {history.date}</h3>
                  <h3>Length of Time: {history.lengthOfTime} min</h3>
                </div>
                <button
                  className="Delete button"
                  onClick={() => {
                    removeNappingHistory(history.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

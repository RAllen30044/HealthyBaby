import { useState } from "react";
import { ChildInfo } from "../ChildInfo/ChildInfo";
import {
  TimeInfo,
  dateBeforeBirthMessage,
  UseTimeInfo,
} from "../TimeInfo/TimeInfoProvider";
import "./Diaper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoo,
  faHillRockslide,
  faSquare,
  faDroplet,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { deleteHistoryInfo, diaperUrl, postInfo } from "../../../../callApis";
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
  timeInvalid,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";

import {
  HistoryDeleteIconColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

type DiaperType = "Wet" | "Poop";
type ConsistencyTypeT = "Pebbles" | "Solid" | "Soft" | "Wet";

export const DiaperPage = () => {
  const [diaperType, setDiaperType] = useState<DiaperType>("Wet");
  const [consistency, setConsistency] = useState<ConsistencyTypeT>("Wet");

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
  } = UseTimeInfo();
  const {
    diapersHistory,
    setDiapersHistory,
    fetchDiaperHistory,
    profileChildren,
    childId,
  } = UseHistoryIDComponent();

  const removeDiaperHistory = (id: number) => {
    const updateData = diapersHistory.filter((history) => history.id !== id);

    setDiapersHistory(updateData);

    deleteHistoryInfo(diaperUrl, id).then((res) => {
      if (!res.ok) {
        setDiapersHistory(diapersHistory);
      } else return;
    });
  };

  return (
    <>
      <div className="banner diaperBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Diapers</h1>
          </div>
        </div>
      </div>

      <section className="historySection">
        <div className="dataInputForm">
          <div className="dataInputFormContainer">
            <h2 className="addHistoryText">Add History</h2>

            <form
              className="diaperForm"
              action="POST"
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  isDateNotBeforeBirth(
                    getChildDOB(profileChildren, childId),
                    date
                  ) ||
                  timeInvalid(date, time)
                ) {
                  setIsSubmitted(true);
                  return;
                }

                setIsSubmitted(false);
                setLoading(true);
                return postInfo(
                  {
                    time: convertToStandardTime(time),
                    date: formatDate(createShortHandDate(date)),
                    diaperType: diaperType,
                    consistency: consistency,
                    childId: childId,
                  },
                  diaperUrl
                )
                  .then(fetchDiaperHistory)
                  .then(() => {
                    setTime("");
                    setDate("");
                    setDiaperType("Wet");
                    setConsistency("Wet");
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
              <div className="diaperType ">
                <label htmlFor="diaperType">Diaper Type?</label>
                <br />
                <button
                  type="button"
                  className={`wet button ${
                    diaperType === "Wet" ? "pressedButton" : ""
                  }`}
                  onClick={() => {
                    setDiaperType("Wet");
                    setConsistency("Wet");
                  }}
                >
                  <FontAwesomeIcon icon={faDroplet} />
                  <p>Wet</p>
                </button>
                <button
                  type="button"
                  className={`poop button ${
                    diaperType === "Poop" ? "pressedButton" : ""
                  }`}
                  onClick={() => {
                    setDiaperType("Poop");
                  }}
                >
                  <FontAwesomeIcon icon={faPoo} />
                  <p>Poop</p>
                </button>
              </div>
              <div
                className={`consistency ${
                  diaperType === "Wet" ? "hidden" : ""
                }`}
              >
                <label htmlFor="consistency">Consistency?</label>
                <br />
                <button
                  type="button"
                  className={`soft button ${
                    consistency === "Soft" ? "pressedButton" : ""
                  }`}
                  onClick={() => {
                    setConsistency("Soft");
                  }}
                >
                  <FontAwesomeIcon icon={faCloud} />
                  <p>Soft</p>
                </button>
                <button
                  type="button"
                  className={`solid button ${
                    consistency === "Solid" ? "pressedButton" : ""
                  }`}
                  onClick={() => {
                    setConsistency("Solid");
                  }}
                >
                  <FontAwesomeIcon icon={faSquare} />
                  <p>Solid</p>
                </button>
                <button
                  type="button"
                  className={`pebbles button ${
                    consistency === "Pebbles" ? "pressedButton" : ""
                  }`}
                  onClick={() => {
                    setConsistency("Pebbles");
                  }}
                >
                  <FontAwesomeIcon icon={faHillRockslide} />
                  <p>Pebbles</p>
                </button>
              </div>
              <div className="saveContainer">
                <button
                  type="submit"
                  className="save diaperSave"
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
                ["Date", "Time", "Diaper(Type)", "Consistency", "Delete?"],
                "Diaper"
              )}
              <div className="historyTimelineContainer ">
                <div>
                  {HistoryInfoColumn(
                    diapersHistory,
                    "date",
                    "",
                    "Diaper"
                  )}
                </div>
                <div>
                  {HistoryInfoColumn(
                    diapersHistory,
                    "time",
                    "",
                    "Diaper"
                  )}
                </div>
                <div>
                  {HistoryInfoColumn(
                    diapersHistory,
                    "diaperType",
                    "",
                    "Diaper"
                  )}
                </div>
                <div>
                  {HistoryInfoColumn(
                    diapersHistory,
                    "consistency",
                    "",
                    "Diaper"
                  )}
                </div>
                {HistoryDeleteIconColumn(
                  diapersHistory,
                  "Diaper",
                  removeDiaperHistory
                )}
              </div>
            </div>
          </section>

          <section className="smallerScreenHistorySection">
            <div className="smallerScreenHistoryTable">
              {HistoryMobileView(
                diapersHistory,
                ["diaperType", "consistency"],
                ["Diaper(Type)", "Consistency"],
                ["", ""],
                "Diaper",
                removeDiaperHistory
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

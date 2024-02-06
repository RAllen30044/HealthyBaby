import { useState } from "react";
import { ChildInfo } from "../ChildInfo/ChildInfo";
import { TimeInfo, useTimeInfo } from "../TimeInfo/TimeInfo";
import "./Diaper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoo,
  faHillRockslide,
  faSquare,
  faDroplet,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { deleteHistoryInfo, diaperUrl, postInfo } from "../../../api";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  convertToStandardTime,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import {
  babyNameForHistory,
  futureTimeNotAllowed,
  timeInvaild,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";

type DaiperType = "Wet" | "Poop";
type ConsistancyTypeT = "Pebbles" | "Solid" | "Soft" | "Wet";

export const DaiperPage = () => {
  const [diaperType, setDiaperType] = useState<DaiperType>("Wet");
  const [consistancy, setConsistancy] = useState<ConsistancyTypeT>("Wet");

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
  const { diapersHistory, setDiapersHistory, fetchDaiperHistory, childId } =
    useHistoryIDComponent();

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
      <div className="dataInputForm">
        <form
          className="diaperForm"
          action="POST"
          onSubmit={(e) => {
            e.preventDefault();
            if (timeInvaild(date, time)) {
              setIsSubmitted(true);
              return;
            }
            setIsSubmitted(false);
            setLoading(true);
            return postInfo(
              {
                time: convertToStandardTime(time),
                date: formatDate(createShortHandDate(date)),
                type: diaperType,
                consistancy: consistancy,
                childId: childId,
              },
              diaperUrl
            )
              .then(fetchDaiperHistory)
              .then(() => {
                setTime("");
                setDate("");
                setDiaperType("Wet");
                setConsistancy("Wet");
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
                setConsistancy("Wet");
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
            className={`consistancy ${diaperType === "Wet" ? "hidden" : ""}`}
          >
            <label htmlFor="consistancy">Consistancy?</label>
            <br />
            <button
              type="button"
              className={`soft button ${
                consistancy === "Soft" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Soft");
              }}
            >
              <FontAwesomeIcon icon={faCloud} />
              <p>Soft</p>
            </button>
            <button
              type="button"
              className={`solid button ${
                consistancy === "Solid" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Solid");
              }}
            >
              <FontAwesomeIcon icon={faSquare} />
              <p>Solid</p>
            </button>
            <button
              type="button"
              className={`pebbles button ${
                consistancy === "Pebbles" ? "pressedButton" : ""
              }`}
              onClick={() => {
                setConsistancy("Pebbles");
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
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>{babyNameForHistory()}'s Diapers History</h1>
        </div>
      </div>
      <div className="historyTimelineContainer">
        {diapersHistory
          .filter((history) => history.childId === childId)
          .sort((a, b) => {
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
                <div className="diapersHistory">
                  <h3>Date: {history.date}</h3>
                  <h3>Time: {history.time}</h3>
                  <h3>Type of Diaper: {history.type}</h3>
                  <h3>Consistancy: {history.consistancy}</h3>
                </div>
                <button
                  className="Delete button"
                  onClick={() => {
                    removeDiaperHistory(history.id);
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

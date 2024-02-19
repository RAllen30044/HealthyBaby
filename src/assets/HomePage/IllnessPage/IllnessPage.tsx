import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./IllnessPage.css";
import {
  TimeInfo,
  dateBeforeBirthMessage,
  useTimeInfo,
} from "../TimeInfo/TimeInfoProvider";
import { useState } from "react";

import { deleteHistoryInfo, illnessUrl, postInfo } from "../../../api";
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
  onlyNumbersWithDecimal,
  preventKeyingNumbers,
  timeInvaild,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";

export const IllnessPage = () => {
  const [sicknessType, setSicknessType] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicineGiven, setMedicineGiven] = useState("");
  const [oz, setOz] = useState("");
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
  const { illnessHistory, setIllnessHistory, fetchIllnessHistory, childId } =
    useHistoryIDComponent();

  const removeIllnessHistory = (id: number) => {
    const updateData = illnessHistory.filter((history) => history.id !== id);
    setIllnessHistory(updateData);

    deleteHistoryInfo(illnessUrl, id).then((res) => {
      if (!res.ok) {
        setIllnessHistory(illnessHistory);
      } else return;
    });
  };
const newDate = new Date("January 30, 2024")
const nextDate = new Date("Febuary 13, 2024 ")
console.log(newDate > nextDate);

  return (
    <>
      <div className="banner illnessBanner">
        <ChildInfo />
        <div className="category">
          <div className="categoryName">
            <h1>Illness</h1>
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
                sicknessType: sicknessType,
                symptoms: symptoms,
                medicineGiven: medicineGiven,
                oz: oz,
                childId: childId,
              },
              illnessUrl
            )
              .then(fetchIllnessHistory)
              .then(() => {
                setDate("");
                setTime("");
                setSymptoms("");
                setSicknessType("");
                setOz("");
                setMedicineGiven("");
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
          <div className="sickness">
            <label htmlFor="sickness">Sickness: </label>
            <input
              type="text"
              id="sickness"
              value={sicknessType}
              onChange={(e) => {
                setSicknessType(e.target.value);
              }}
              required
            />
          </div>
          <div className="symptoms">
            <label htmlFor="symptoms">Symptoms: </label>
            <input
              type="text"
              id="symptoms"
              value={symptoms}
              onChange={(e) => {
                setSymptoms(e.target.value);
              }}
              required
            />
          </div>
          <div className="medicineGiven">
            <label htmlFor="medicineGiven">Medicine given: </label>
            <input
              type="text"
              id="medicineGiven"
              value={medicineGiven}
              onChange={(e) => {
                setMedicineGiven(preventKeyingNumbers(e.target.value));
              }}
              required
            />
          </div>
          <div className="oz">
            <label htmlFor="oz">Oz: </label>
            <input
              type="text"
              id="oz"
              value={oz}
              onChange={(e) => {
                setOz(onlyNumbersWithDecimal(e.target.value));
              }}
              required
            />
          </div>
          <div className="saveContainer">
            <button
              type="submit"
              className="save illnessSave"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="historyHeaderContainer">
        <div className="categoryName historyHeader">
          <h1>{babyNameForHistory()}'s Illness History</h1>
        </div>
      </div>
      <div className="historyTimelineContainer">
        {illnessHistory
          .filter((history) => history.childId === childId)
          .sort((b, a) => {
            if (new Date(a.date) < new Date(b.date)) {
              return -1;
            }
            if (new Date(a.date) > new Date(b.date)) {
              return 1;
            }

            return 0;
          })
          .map((history) => {
            return (
              <div className="historyContainer" key={history.id}>
                <div className="illnessHistory">
                  <h3>Date: {history.date}</h3>
                  <h3>Time: {history.time}</h3>
                  <h3>Type of Sickness: {history.sicknessType}</h3>
                  <h3>Symptoms: {history.symptoms}</h3>
                  <h3>Medicine Given: {history.medicineGiven}</h3>
                  <h3>Oz. of Medicine Given: {history.oz}</h3>
                </div>
                <button
                  className="Delete button"
                  onClick={() => {
                    removeIllnessHistory(history.id);
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

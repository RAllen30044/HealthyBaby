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
import {
  HistoryDateAndTimeColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";

export const IllnessPage = () => {
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

  const removeIllnessHistory = (id: string) => {
    const updateData = illnessHistory.filter((history) => history.id !== id);
    setIllnessHistory(updateData);

    deleteHistoryInfo(illnessUrl, id).then((res) => {
      if (!res.ok) {
        setIllnessHistory(illnessHistory);
      } else return;
    });
  };
  const newDate = new Date("January 30, 2024");
  const nextDate = new Date("Febuary 13, 2024 ");
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

      <section className="historySection">
        <div className="dataInputForm illnessForm">
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

                    symptoms: symptoms,
                    medicineGiven: medicineGiven,
                    medicineOz: oz,
                    childId: childId,
                  },
                  illnessUrl
                )
                  .then(fetchIllnessHistory)
                  .then(() => {
                    setDate("");
                    setTime("");
                    setSymptoms("");

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
                ["Symptoms", "Type of Medicine", "Medicine Given(Oz)"],
                "Illness"
              )}
              <div className="historyTimelineContainer ">
                {HistoryDateAndTimeColumn(
                  illnessHistory,
                  "Illness",
                  removeIllnessHistory
                )}
                <div>
                  {HistoryInfoColumn(illnessHistory, "symptoms", "", "Illness")}
                </div>
                <div>
                  {HistoryInfoColumn(
                    illnessHistory,
                    "medicineGiven",
                    "",
                    "Illness"
                  )}
                </div>
                <div>
                  {HistoryInfoColumn(
                    illnessHistory,
                    "medicineOz",
                    "oz",
                    "Illness"
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="smallerScreenHistorySection">
            <div className="smallerScreenHistoryTable">
              {HistoryMobileView(
                illnessHistory,
                ["symptoms", "medicineGiven", "medicineOz"],
                ["Symptoms", "Type of Medicine", "Medicine Given(oz)"],
                ["", "", "oz"],
                "Illness",
                removeIllnessHistory
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

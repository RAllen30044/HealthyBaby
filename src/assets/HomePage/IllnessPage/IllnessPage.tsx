import { ChildInfo } from "../ChildInfo/ChildInfo";
import "./IllnessPage.css";
import {
  TimeInfo,
  dateBeforeBirthMessage,
  UseTimeInfo,
} from "../TimeInfo/TimeInfoProvider";
import { useState } from "react";

import { deleteHistoryInfo, illnessUrl, postInfo } from "../../../../callApis";
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
  preventKeyingNumbers,
  timeInvalid,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
// import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import {
  HistoryDateAndTimeColumn,
  HistoryInfoColumn,
  HistoryMobileView,
  HistoryTableHeader,
} from "../historyTable";
import { useChildInfo } from "../ChildPage/ChildInfoProvider";

export const IllnessPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [medicationType, setMedicationType] = useState("");
  const [dosage, setDosage] = useState("");

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
    illnessHistory,
    setIllnessHistory,
    fetchIllnessHistory,
    profileChildren,
    childId,
  } = UseHistoryIDComponent();
  const { unitOfMeasurement, setUnitOfMeasurement } = useChildInfo();

  const removeIllnessHistory = (id: number) => {
    const updateData = illnessHistory.filter((history) => history.id !== id);
    setIllnessHistory(updateData);

    deleteHistoryInfo(illnessUrl, id).then((res) => {
      if (!res.ok) {
        setIllnessHistory(illnessHistory);
      } else return;
    });
  };

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

                if (timeInvalid(date, time)) {
                  setIsSubmitted(true);
                  return;
                }
                if (
                  isDateNotBeforeBirth(
                    getChildDOB(profileChildren, childId),
                    date
                  )
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
                    medicationType: medicationType,
                    dosage: `${dosage} ${unitOfMeasurement}`,
                    childId: childId,
                  },
                  illnessUrl
                )
                  .then(fetchIllnessHistory)
                  .then(() => {
                    setDate("");
                    setTime("");
                    setSymptoms("");

                    setDosage("");
                    setMedicationType("");
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
                <label htmlFor="medicineGiven">Medicine: </label>
                <input
                  type="text"
                  id="medicineGiven"
                  value={medicationType}
                  onChange={(e) => {
                    setMedicationType(preventKeyingNumbers(e.target.value));
                  }}
                  required
                />
              </div>
              <div className="dosage">
                <label htmlFor="dosage">Dosage: </label>
                <input
                  type="text"
                  id="dosage"
                  value={dosage}
                  onChange={(e) => {
                    setDosage(e.target.value);
                  }}
                  required
                />
                <div className={`unitOfMeasurementButtons`}>
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
                ["Symptoms", "Type of Medicine", "Dosage"],
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
                    "medicationType",
                    "",
                    "Illness"
                  )}
                </div>
                <div>
                  {HistoryInfoColumn(illnessHistory, "dosage", "", "Illness")}
                </div>
              </div>
            </div>
          </section>

          <section className="smallerScreenHistorySection">
            <div className="smallerScreenHistoryTable">
              {HistoryMobileView(
                illnessHistory,
                ["symptoms", "medicationType", "dosage"],
                ["Symptoms", "Medicine", "Dosage"],
                ["", "", ""],
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

import toast from "react-hot-toast";
import {
  futureDOBNotAllowed,
  isDOBValid,
  isEntryNotANumber,
  numberErrorMessage,
  onlyKeyNumbers,
  preventKeyingNumbers,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import { updateChildInfo } from "../../../../callApis";
// import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

import { UseTimeInfo } from "../TimeInfo/TimeInfoProvider";
import "./ChildPage.css";

import { useChildInfo } from "./ChildInfoProvider";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

// type Gender = "Male" | "Female";
// const getCurrentChildInfo = localStorage.getItem("child");

export const EditChildPage = () => {
  const {
    childName,
    setChildName,
    gender,
    setGender,
    DOB,
    setDOB,
    headSize,
    setHeadSize,
    weight,
    setHeight,
    height,
    setWeight,
  } = useChildInfo();

  const { loading, setLoading } = UseTimeInfo();
  const { setActiveHomePageComponent, setActiveMainComponent, setEditor } =
    useActiveComponent();
  const { setIsSubmitted, shouldShowDOBentryError, isSubmitted } =
    UseTimeInfo();

  const { profileUsername, token, childId, setToken } = UseHistoryIDComponent();
  const shouldShowNumberErrorMessageForWeight =
    isSubmitted && isEntryNotANumber(weight);
  const shouldShowNumberErrorMessageForHeight =
    isSubmitted && isEntryNotANumber(height);
  const shouldShowNumberErrorMessageForHeadSize =
    isSubmitted && isEntryNotANumber(headSize);

  return (
    <>
      <div className="childPage">
        <h1>Edit Child </h1>
        <div className="childPageInfo">
          <form
            action="POST"
            className="childInfo"
            onSubmit={(e) => {
              e.preventDefault();

              if (
                isDOBValid(DOB) ||
                isEntryNotANumber(headSize) ||
                isEntryNotANumber(height) ||
                isEntryNotANumber(weight)
              ) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);

              return updateChildInfo(
                {
                  name: childName,
                  DOB,
                  gender,
                  height,
                  weight,
                  headSize,
                  profileUsername,
                },
                childId,
                token
              )
                .then((res) => {
                  if (!res.ok) {
                    toast("error");
                  }
                  setToken("");
                  return res.json();
                })
                .then(() => {
                  setToken(localStorage.getItem("token"));
                  toast.success("Child Profile information Updated");
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                  setEditor("not present");
                  setLoading(false);
                });
            }}
          >
            <div className="nameInfo childInfoContainer">
              <label className="editChildName childInfoLabel">Name:</label>
              <input
                type="text"
                className="name childInfoInput"
                value={childName}
                onChange={(e) => {
                  setChildName(preventKeyingNumbers(e.target.value));
                }}
              />
            </div>
            {shouldShowDOBentryError && (
              <ErrorMessage message={futureDOBNotAllowed} show={true} />
            )}

            <div className="DOBInfo childInfoContainer">
              <label className="DOB childInfoLabel">Date of Birth:</label>
              <input
                type="date"
                className="ageNumber childInfoInput"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                required
              />
            </div>

            <div className="genderInfo childInfoContainer">
              <label className="gender childInfoLabel">Gender :</label>
              <button
                type="button"
                className={`male button ${
                  gender === "male" ? "genderSelected" : ""
                }`}
                onClick={() => {
                  setGender("male");
                }}
              >
                <i className="fa fa-male" aria-hidden="true"></i>
                <div className="maleText">Male</div>
              </button>
              <button
                type="button"
                className={`female button ${
                  gender === "female" ? "genderSelected" : ""
                }`}
                onClick={() => {
                  setGender("female");
                }}
              >
                <i className="fa fa-female" aria-hidden="true"></i>
                <div className="femaleText">Female</div>
              </button>
            </div>

            <div className="weightInfo childInfoContainer">
              <label className="weight childInfoLabel">Weight: </label>
              <input
                type="text"
                className="weightNumber  childInfoInput"
                value={weight}
                onChange={(e) => {
                  setWeight(onlyKeyNumbers(e.target.value));
                }}
              />
              <span> lbs.</span>
            </div>
            {shouldShowNumberErrorMessageForWeight && (
              <ErrorMessage message={numberErrorMessage} show={true} />
            )}
            <div className="heightInfo childInfoContainer">
              <label className="height childInfoLabel">Height: </label>
              <input
                type="text"
                className="heightNumber  childInfoInput"
                value={height}
                onChange={(e) => {
                  setHeight(onlyKeyNumbers(e.target.value));
                }}
              />
              <span> in.</span>
            </div>
            {shouldShowNumberErrorMessageForHeight && (
              <ErrorMessage message={numberErrorMessage} show={true} />
            )}

            <div className="headSizeInfo childInfoContainer">
              <label className="headSize childInfoLabel">Head Size:</label>
              <input
                type="text"
                className="headSizeNumber  childInfoInput"
                value={headSize}
                onChange={(e) => {
                  setHeadSize(onlyKeyNumbers(e.target.value));
                }}
              />
              <span>in.</span>
            </div>
            {shouldShowNumberErrorMessageForHeadSize && (
              <ErrorMessage message={numberErrorMessage} show={true} />
            )}
            <div className="buttonContainer ">
              <button
                type="submit"
                className="saveButton feedingSave"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

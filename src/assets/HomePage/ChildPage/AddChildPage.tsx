import toast from "react-hot-toast";
import {
  futureDOBNotAllowed,
  getIsSubmittedFromLocalStorage,
  isDOBValid,
  isEntryNotANumber,
  numberErrorMessage,
  onlyKeyNumbers,
  preventKeyingNumbers,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
  setIsSubmittedInLocalStorage,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import { authorization, childrenUrl, postInfo } from "../../../../callApis";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

import { UseTimeInfo } from "../TimeInfo/TimeInfoProvider";
import "./ChildPage.css";
import { useState } from "react";
import { UseAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";

type Gender = "Male" | "Female";

export const AddChildPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("Female");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
  const { loading, setLoading, date, setDate } = UseTimeInfo();
  const { setActiveMainComponent, setActiveHomePageComponent } =
    useActiveComponent();
  const { showAddChildError, setShowAddChildError, password, setPassword } =
    UseAuthProviderContext();
  const { setIsSubmitted, shouldShowDOBentryError, isSubmitted } =
    UseTimeInfo();
  const {
    setChildId,

    setToken,
    profileChildren,
    // profileUsername,
  } = UseHistoryIDComponent();

  const addChildErrorMessage =
    "This profile has not added a child. In order to continue you must add a child to your profile.";

  const shouldShowNumberErrorMessageForWeight =
    isSubmitted && isEntryNotANumber(weight);
  const shouldShowNumberErrorMessageForHeight =
    isSubmitted && isEntryNotANumber(height);
  const shouldShowNumberErrorMessageForHeadSize =
    isSubmitted && isEntryNotANumber(headSize);
  return (
    <>
      <div className="childPage">
        <h1>Add Child </h1>
        <div className="childPageInfo">
          <form
            action="POST"
            className="childInfo"
            onSubmit={async (e) => {
              e.preventDefault();
              const storedUsername = localStorage.getItem("profileUserName");
              if (
                isDOBValid(date) ||
                isEntryNotANumber(headSize) ||
                isEntryNotANumber(height) ||
                isEntryNotANumber(weight)
              ) {
                setIsSubmittedInLocalStorage("true");
                setIsSubmitted(getIsSubmittedFromLocalStorage());

                return;
              }

              if (profileChildren.length === 0) {
                const authorize = await authorization(
                  storedUsername!.toLowerCase(),
                  password
                );
                console.log(authorize.token);

                if (authorize) {
                  setToken(authorize.token);
                  localStorage.setItem("token", authorize.token);
                }
              }
              setIsSubmitted(false);
              setIsSubmittedInLocalStorage("false");
              setIsSubmitted(getIsSubmittedFromLocalStorage());
              setShowAddChildError(getIsSubmittedFromLocalStorage());

              setLoading(true);

              return postInfo(
                {
                  name: name,
                  DOB: date,
                  gender: gender,
                  weight: weight,
                  headSize: headSize,
                  height: height,
                  profileUsername: storedUsername!.toLowerCase(),
                },
                childrenUrl
              )
                .then((res) => {
                  if (!res.ok) {
                    throw new Error("Failed to save child information");
                  }
                  setToken("");
                  return res.json();
                })
                .then((data) => {
                  setToken(localStorage.getItem("token"));
                  console.log(data);
                  setChildId(data.id);
                  localStorage.setItem("childId", JSON.stringify(data.id));
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
                  setIsSubmittedInLocalStorage("false");
                  setShowAddChildError(getIsSubmittedFromLocalStorage());
                  setPassword("");
                  setDate("");
                  setGender("Female");
                  setWeight("");
                  setHeight("");
                  setHeadSize("");
                })
                .catch((err) => {
                  console.error("Error saving child information:", err);
                  toast.error("Failed to save child information");
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {" "}
            {showAddChildError && (
              <ErrorMessage message={addChildErrorMessage} show={true} />
            )}
            <div className="nameInfo childInfoContainer">
              <label className="childName childInfoLabel">Name:</label>
              <input
                type="text"
                className="name childInfoInput"
                value={name}
                onChange={(e) => {
                  setName(preventKeyingNumbers(e.target.value));
                }}
                required
              />
            </div>
            {shouldShowDOBentryError && (
              <ErrorMessage message={futureDOBNotAllowed} show={true} />
            )}
            <div className="ageInfo childInfoContainer">
              <label className="age childInfoLabel">Date of Birth:</label>
              <input
                type="date"
                className="ageNumber childInfoInput"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </div>
            <div className="genderInfo childInfoContainer">
              <label className="gender childInfoLabel">Gender :</label>

              <button
                type="button"
                className={`male button ${
                  gender === "Male" ? "genderSelected" : ""
                }`}
                onClick={() => {
                  setGender("Male");
                }}
              >
                <i className="fa fa-male" aria-hidden="true"></i>
                <div className="maleText">Male</div>
              </button>

              <button
                type="button"
                className={`female button ${
                  gender === "Female" ? "genderSelected" : ""
                }`}
                onClick={() => {
                  setGender("Female");
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

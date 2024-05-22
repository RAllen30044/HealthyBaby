import toast from "react-hot-toast";
import {
  futureDOBNotAllowed,
  getIsSubmittedFromLocalStorage,
  isDOBValid,
  onlyKeyNumbers,
  preventKeyingNumbers,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
  setIsSubmittedInLocalStorage,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import {
  authorization,
  childrenUrl,
  getProfilesFirstChild,
  // getProfilesChildren,
  // getProfilesFirstChild,
  postInfo,
} from "../../../../callApis";
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
  const { showAddChildError, setShowAddChildError, password } =
    UseAuthProviderContext();
  const { setIsSubmitted, shouldShowDOBentryError } = UseTimeInfo();
  const {
    setChildId,
    //  setProfileChildren,
    //  profileChildren
    setToken,
    hashedPassword,
    profileUsername,
  } = UseHistoryIDComponent();

  const addChildErrorMessage =
    "This profile has not added a child. In order to continue you must add a child to your profile.";
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

              console.log(profileUsername.toLowerCase(), hashedPassword);

              const authorize = await authorization(
                profileUsername.toLowerCase(),
                password
              );
              console.log(authorize.token);

              if (isDOBValid(date)) {
                setIsSubmittedInLocalStorage("true");
                setIsSubmitted(getIsSubmittedFromLocalStorage());

                return;
              }
              if (authorize) {
                setToken(authorize.token);
                localStorage.setItem("token", authorize.token);
              }

              setIsSubmittedInLocalStorage("true");
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
                  profileUsername: profileUsername.toLowerCase(),
                },
                childrenUrl
              )
                .then((res) => {
                  if (!res.ok) {
                    throw new Error("Failed to save child information");
                  }
                  return res.json();
                })
                .then((data) => {
                  console.log(data);
                  setChildId(data.id);
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
                  setIsSubmittedInLocalStorage("false");
                  setShowAddChildError(getIsSubmittedFromLocalStorage());
                  setDate("");
                  setGender("Female");
                  setWeight("");
                  setHeight("");
                  setHeadSize("");
                })
                .catch((err) => {
                  console.error("Error saving child information:", err);
                  // Handle error
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
              />
            </div>
            <div className="genderInfo childInfoContainer">
              <label className="gender childInfoLabel">Gender :</label>

              <button
                type="button"
                className={`male button ${
                  gender === "Male" ? "pressedButton" : ""
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
                  gender === "Female" ? "pressedButton" : ""
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

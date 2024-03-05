import toast from "react-hot-toast";
import {
  
  futureDOBNotAllowed,
  isDOBVaild,
  onlyKeyNumbers,
  preventKeyingNumbers,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { updateChildInfo } from "../../../api";
// import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

import { useTimeInfo } from "../TimeInfo/TimeInfoProvider";
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

    currentChildId,
  } = useChildInfo();

  const { loading, setLoading } = useTimeInfo();
  const { setActiveHomePageComponent, setActiveMainComponent, setEditor } =
    useActiveComponent();
  const { setIsSubmitted, shouldShowDOBentryError } = useTimeInfo();
  const { fetchChildInfo, setChildId } = useHistoryIDComponent();

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

              if (isDOBVaild(DOB)) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);

              return updateChildInfo(
                childName,
                DOB,
                gender,
                height,
                weight,
                headSize,
                currentChildId
              )
                .then((res) => {
                  if (!res.ok) {
                    toast("error");
                  }

                  return res.json();
                })
                .then((data) => {
                  localStorage.setItem(
                    "child",
                    JSON.stringify({
                      name: data.name,

                      DOB: data.DOB,
                      gender: data.gender,
                      weight: data.weight,
                      height: data.height,
                      headSize: data.headSize,
                      profileId: data.profileId,
                      id: data.id,
                    })
                  );

                  setChildId(JSON.parse(data.id));
                })
                .then(fetchChildInfo)
                .then(() => {
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

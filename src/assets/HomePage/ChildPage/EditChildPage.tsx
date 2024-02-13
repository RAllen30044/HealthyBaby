import toast from "react-hot-toast";
import {
  DOBnotVaild,
  futureDOBNotAllowed,
  onlyKeyNumbers,
  preventKeyingNumbers,
  
  setActiveHomePageComponentInLocalStorage,
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
  // const [correctedName, setCorrectedName] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).name
  //     : "Couldn't find name"

  // );
  // const [correctedGender, setCorrectedGender] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).gender
  //     : "Couldn't find gender"

  // );
  // const [correctedWeight, setCorrectedWeight] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).weight
  //     : "Couldn't find Weight"

  // );
  // const [correctedHeight, setCorrectedHeight] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).height
  //     : "Couldn't find height"

  // );
  // const [correctedHeadSize, setCorrectedHeadSize] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).headSize
  //     : "Couldn't find head size"

  // );
  // const [correctedDOB, seCorrectedDOB] = useState(
  //   getCurrentChildInfo
  //     ? JSON.parse(getCurrentChildInfo).DOB
  //     : "Couldn't find DOB"

  // );

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
  const { setActiveHomePageComponent, setEditor } = useActiveComponent();
  const { setIsSubmitted, shouldShowDOBentryError } = useTimeInfo();
  const { fetchChildInfo, setChildId } = useHistoryIDComponent();

  // const [babyPic, setBabyPic] = useState<string>("");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   // Do something with the selected file, e.g., display it or upload it
  //   if (selectedFile) {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       // Set the selected image to the base64 data URL of the selected file.
  //       const dataUrl = reader.result as string;
  //       setBabyPic(dataUrl);
  //       localStorage.setItem("selectedPicture", dataUrl);
  //     };

  //     reader.readAsDataURL(selectedFile);
  //   }
  // };

  return (
    <>
      <div className="childPage">
        <h1>Edit Child Page</h1>
        <div className="childPageInfo">
          {/* <div
            className="childPictureContainer"
            onClick={() => {
              document.getElementById("fileInput")?.click();
            }}
          >
            {babyPic ? (
              <img src={`${babyPic}`} alt="" />
            ) : (
              <i className="fa fa-plus fa-5x" aria-hidden="false"></i>
            )}

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div> */}

          <form
            action="POST"
            className="childInfo"
            onSubmit={(e) => {
              e.preventDefault();

              if (DOBnotVaild(DOB)) {
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
                      age: data.age,
                      DOB: data.DOB,
                      gender: data.gender,
                      weight: data.weight,
                      height: data.height,
                      headSize: data.HeadSize,
                      profileId: data.profileId,
                      id: data.id,
                    })
                  );

                  setChildId(JSON.parse(data.id));
                })
                .then(fetchChildInfo)

                .then(() => {
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
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

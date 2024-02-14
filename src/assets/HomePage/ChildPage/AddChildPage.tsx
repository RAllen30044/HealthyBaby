import toast from "react-hot-toast";
import {
  DOBnotVaild,
  futureDOBNotAllowed,
  onlyKeyNumbers,
  preventKeyingNumbers,
} from "../../../ErrorHandling";
import { ErrorMessage } from "../../../ErrorMessage";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { childUrl, postInfo } from "../../../api";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

import { convertAgeToAppropriateAgeType } from "../TimeInfo/TimeConversion";

import { useTimeInfo } from "../TimeInfo/TimeInfoProvider";
import "./ChildPage.css";
import { useState } from "react";

type Gender = "Male" | "Female";

export const AddChildPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("Female");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
  const { loading, setLoading, date, setDate } = useTimeInfo();
  const { setActiveMainComponent, setActiveHomePageComponent } =
    useActiveComponent();
  const { setIsSubmitted, shouldShowDOBentryError } = useTimeInfo();
  const { fetchChildInfo, profileId, setChildId } = useHistoryIDComponent();

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
        <h1>Add Child </h1>
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

              if (DOBnotVaild(date)) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);
              postInfo(
                {
                  name: name,
                  DOB: date,
                  age: convertAgeToAppropriateAgeType(date),
                  gender: gender,
                  weight: `${weight} `,
                  headSize: `${headSize}`,
                  height: `${height}`,
                  // url: babyPic ? babyPic : "",
                  profileId: profileId,
                },
                childUrl
              )
                .then((res) => {
                  if (!res.ok) {
                    toast("error");
                  }
                  setDate("");
                  return res.json();
                })
                .then((data) => {
                  localStorage.setItem(
                    "child",
                    JSON.stringify({
                      name: data.name,
                      age: data.age,
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
                  setActiveMainComponent("home");
                  setActiveHomePageComponent("feeding");
                })
                .then(() => {
                  setLoading(false);
                });
            }}
          >
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

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
import { useChildrenProviderContext } from "../../HealthyBabySite/ProfilePage/profileChildrenProvider";
import { calculateAge, calculateAgeInMonths } from "../TimeInfo/TimeConversion";

import { useTimeInfo } from "../TimeInfo/TimeInfo";
import "./ChildPage.css";
import { useState } from "react";

export const ChildPage = () => {
  const [name, setName] = useState("");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
  const { loading, setLoading, date, setDate } = useTimeInfo();
  const { setActiveComponent } = useActiveComponent();
  const { setIsSubmitted, shouldShowDOBentryError } = useTimeInfo();
  const { fetchChildInfo,profileId } = useHistoryIDComponent();
  const {sethasChildren}=useChildrenProviderContext();
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
        <h1>Child Page</h1>
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
                  age:
                    calculateAge(date) < 2
                      ? `${calculateAgeInMonths(date)} months`
                      : `${calculateAge(date)} yrs.`,
                  weight: `${weight} lbs.`,
                  headSize: `${headSize} in.`,
                  height: `${height} in.`,
                  // url: babyPic ? babyPic : "",
                  profileId:profileId
                },
                childUrl
              )
                .then(fetchChildInfo)

                .then(() => {
                  setDate("");
                  sethasChildren(true)
                
                })
                .then(() => {
                  setActiveComponent("feeding");
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
              <button className="saveButton feedingSave" disabled={loading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

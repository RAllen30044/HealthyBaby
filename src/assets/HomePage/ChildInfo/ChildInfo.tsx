import { setActiveMainComponentInLocalStorage } from "../../../ErrorHandling";
import "./ChildInfo.css";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

import { useChildInfo } from "../ChildPage/ChildInfoProvider";
import {
  convertAgeToAppropriateAgeType,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";
import { UseTimeInfo } from "../TimeInfo/TimeInfoProvider";
import { UseHistoryIDComponent } from "../../../HistoryProvider";

export const ChildInfo = () => {
  const { profileChildren, childId } = UseHistoryIDComponent();
  const { editor, setEditor, setActiveMainComponent } = useActiveComponent();
  const {
    setChildName,
    setDOB,
    setGender,
    setHeadSize,
    setWeight,
    setHeight,
    setCurrentChildId,
  } = useChildInfo();
  const { setDate, setTime } = UseTimeInfo();
  const inchToFeet = (inches: string) => {
    const inchNumber = Number.parseInt(inches);
    if (inchNumber >= 24) {
      return `${Math.floor(inchNumber / 12)}' ${inchNumber % 12}"`;
    }
    return `${inchNumber} in.`;
  };
 

  return (
    <>
      <div className="childInfoContainerHP">
        {profileChildren
          .filter((child) => child.id === childId)
          .map((child) => (
            <div className="info" key={child.id}>
              <div className="childname">Name: {child.name}</div>
              <div className="childAge">
                Age: {convertAgeToAppropriateAgeType(child.DOB)}
              </div>
              <div className="DOB">
                Date of Birth: {formatDate(createShortHandDate(child.DOB))}{" "}
              </div>
              <div className="childGender">Gender: {child.gender} </div>
              <div className="childHeight">
                Height: {inchToFeet(child.height)}
              </div>
              <div className="childWeight">Weight: {child.weight} lbs.</div>
              <div className="childHeadSize">
                Head Size: {child.headSize} in.
              </div>

              {editor === "not present" ? (
                <div className="editButtonContainer">
                  <button
                    className="button editButton"
                    type="button"
                    onClick={() => {
                      setChildName(child.name);
                      setGender(child.gender);
                      setHeadSize(child.headSize);
                      setWeight(child.weight);
                      setHeight(child.height);
                      setDOB(child.DOB);
                      setCurrentChildId(child.id);
                      setEditor("present");
                      setActiveMainComponent("editChild");
                      setActiveMainComponentInLocalStorage("editChild");
                      setDate("");
                      setTime("");
                    }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
      </div>
    </>
  );
};

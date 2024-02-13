import { setActiveMainComponentInLocalStorage } from "../../../ErrorHandling";

import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";
import { useAuthProviderContext } from "../../HealthyBabySite/LandingPage/authProvider";
import { useChildInfo } from "../ChildPage/ChildInfoProvider";
import {
  convertAgeToAppropriateAgeType,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";

export const ChildInfo = () => {
  const { maybeChild } = useAuthProviderContext();

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
  return (
    <>
      <div className="childInfoContainerHP">
        {maybeChild ? (
          <div className="info" key={JSON.parse(maybeChild).id}>
            <div className="childname">Name: {JSON.parse(maybeChild).name}</div>
            <div className="childAge">
              Age: {convertAgeToAppropriateAgeType(JSON.parse(maybeChild).DOB)}{" "}
            </div>
            <div className="DOB">
              Date of Birth:{" "}
              {formatDate(createShortHandDate(JSON.parse(maybeChild).DOB))}{" "}
            </div>
            <div className="childGender">
              Gender: {JSON.parse(maybeChild).gender}{" "}
            </div>
            <div className="childHeight">
              Height: {JSON.parse(maybeChild).height} in.
            </div>
            <div className="childWeight">
              Weight: {JSON.parse(maybeChild).weight} lbs.
            </div>
            <div className="childHeadSize">
              Head Size: {JSON.parse(maybeChild).headSize} in.
            </div>
            {editor === "not present" ? (
              <button
                className="button"
                type="button"
                onClick={() => {
                  setChildName(JSON.parse(maybeChild).name);
                  setGender(JSON.parse(maybeChild).gender);
                  setHeadSize(JSON.parse(maybeChild).headSize);
                  setWeight(JSON.parse(maybeChild).weight);
                  setHeight(JSON.parse(maybeChild).height);
                  setDOB(JSON.parse(maybeChild).DOB);
                  setCurrentChildId(JSON.parse(maybeChild).id);
                  setEditor("present");
                  setActiveMainComponent("editChild");
                  setActiveMainComponentInLocalStorage("editChild");
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

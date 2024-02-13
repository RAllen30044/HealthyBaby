import { setActiveComponentInLocalStorage } from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";
import { useChildInfo } from "../ChildPage/ChildInfoProvider";
import {
  convertAgeToAppropriateAgeType,
  createShortHandDate,
  formatDate,
} from "../TimeInfo/TimeConversion";

export const ChildInfo = () => {
  const { childInfo, childId } = useHistoryIDComponent();
  const { editor, setEditor, setActiveComponent } = useActiveComponent();
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
        {/* <div className="childPictureContainer">
          {childInfo.length > 0 ? (
            <img src={`${childInfo[0].url}`} alt="picture" />
          ) : (
            <i className="fa fa-plus fa-5x" aria-hidden="false"></i>
          )}
        </div> */}
        <div>
          {childInfo
            .filter((child) => child.id === childId)
            .map((child) => {
              return (
                <div className="info" key={child.id}>
                  <div className="childname">Name: {child.name}</div>

                  <div className="childAge">
                    Age: {convertAgeToAppropriateAgeType(child.DOB)}{" "}
                  </div>
                  <div className="DOB">
                    Date of Birth: {formatDate(createShortHandDate(child.DOB))}{" "}
                  </div>

                  <div className="childGender">Gender: {child.gender} </div>
                  <div className="childHeight">Height: {child.height} in.</div>

                  <div className="childWeight">Weight: {child.weight} lbs.</div>
                  <div className="childHeadSize">
                    Head Size: {child.headSize} in.
                  </div>
                  {editor === "not present" ? (
                    <button
                      className="button"
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
                        setActiveComponent("editChild");
                        setActiveComponentInLocalStorage("editChild");
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

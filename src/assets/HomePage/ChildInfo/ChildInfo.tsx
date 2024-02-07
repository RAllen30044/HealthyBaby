import { setActiveComponentInLocalStorage } from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { useActiveComponent } from "../../HealthyBabySite/Header/ActiveComponentProvider";

export const ChildInfo = () => {
  const { childInfo, childId } = useHistoryIDComponent();
  const { editor, setEditor, setActiveComponent } = useActiveComponent();

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

                  <div className="childAge">Age: {child.age} </div>

                  <div className="childGender">gender: {child.gender} </div>
                  <div className="childHeight">Height: {child.height} </div>

                  <div className="childWeight">Weight: {child.weight}</div>
                  <div className="childHeadSize">
                    Head Size: {child.headSize}
                  </div>
                  {editor === "not present" ? (
                    <button
                      className="button"
                      type="button"
                      onClick={() => {
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

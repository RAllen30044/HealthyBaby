import { useHistoryIDComponent } from "../../../HistoryProvider";
import { useChildrenProviderContext } from "../../HealthyBabySite/ProfilePage/profileChildrenProvider";

export const ChildInfo = () => {
  const { childInfo, childId, profileId } = useHistoryIDComponent();
  const { hasChildren, myChildren } = useChildrenProviderContext();
  console.log(myChildren);
  console.log(childId);
  const firstAvailableChild = childInfo.find(
    (child) => child.profileId === profileId
  );
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
          {hasChildren === true ? (
            <div className="info">
              <div className="childname">
                Name: {firstAvailableChild?.name || childInfo[childId].name}
              </div>

              <div className="childAge">
                Age: {firstAvailableChild?.age || childInfo[childId].age}{" "}
              </div>

              <div className="childGender">
                Height:{" "}
                {firstAvailableChild?.gender || childInfo[childId].gender}{" "}
              </div>
              <div className="childHeight">
                Height:{" "}
                {firstAvailableChild?.height || childInfo[childId].height}{" "}
              </div>

              <div className="childWeight">
                Weight:{" "}
                {firstAvailableChild?.weight || childInfo[childId].weight}
              </div>
              <div className="childHeadSize">
                Head Size:{" "}
                {firstAvailableChild?.headSize || childInfo[childId].headSize}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

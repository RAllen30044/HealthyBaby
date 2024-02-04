import { useHistoryIDComponent } from "../../../HistoryProvider";
import { useChildrenProviderContext } from "../../HealthyBabySite/ProfilePage/profileChildrenProvider";

export const ChildInfo = () => {
  const { childInfo, childId, profileId,  } = useHistoryIDComponent();
  const {  myChildren } = useChildrenProviderContext();

  console.log(myChildren);
  console.log(childId);

 
  const firstAvailableChild = childInfo.find(
    (child) => child.profileId === profileId
  );
  console.log(firstAvailableChild);
console.log(childInfo);


  
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
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

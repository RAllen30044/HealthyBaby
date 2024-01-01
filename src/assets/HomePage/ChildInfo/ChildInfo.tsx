import { useHistoryIDComponent } from "../../../HistoryProvider";

export const ChildInfo = () => {
  const { childInfo, childId } = useHistoryIDComponent();

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
          {childInfo.length > 0 ? (
            <div className="info">
              <div className="name">Name: {childInfo[childId].name}</div>

              <div className="age">Age: {childInfo[childId].age} </div>

              <div className="height">Height: {childInfo[childId].height} </div>

              <div className="weight">Weight: {childInfo[childId].weight}</div>
              <div className="headSize">
                Head Size: {childInfo[childId].headSize}
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

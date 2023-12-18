import { useEffect, useState } from "react";
import { ChildInfoT, getChildInfo } from "./ChildInfoApi";

export const ChildInfo = () => {
  const [childInfo, setChildInfo] = useState<ChildInfoT[]>([]);
  const fetchChildInfo = () => {
    return getChildInfo().then(setChildInfo);
  };
  useEffect(() => {
    fetchChildInfo().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <div className="childInfoContainerHP">
        <div className="childPictureContainer">
          {childInfo.length > 0 ? (
            <img src={`${childInfo[0].url}`} alt="picture" />
          ) : (
            <i className="fa fa-plus fa-5x" aria-hidden="false"></i>
          )}
        </div>
        <div>
          {childInfo.length > 0 ? (
            <div className="info">
              <div className="name">Name: {childInfo[0].name}</div>

              <div className="age">Age: {childInfo[0].age} </div>

              <div className="height">Height: {childInfo[0].height} </div>

              <div className="weight">Weight: {childInfo[0].weight}</div>
              <div className="headSize">Head Size: {childInfo[0].headSize}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

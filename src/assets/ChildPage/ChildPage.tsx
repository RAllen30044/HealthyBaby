import "./ChildPage.css";



export const ChildPage = () => {
  return (
    <>
      <div className="childPage">
        <h1>Child Page</h1>
        <div className="childPageInfo">
          <h2>Name</h2>
          <div className="childPictureContainer">
            <i className="fa fa-plus fa-5x" aria-hidden="false"></i>
          </div>

          <form action="POST" className="childInfo">
            <div className="nameInfo childInfoContainer">
              <label className="childName childInfoLabel">Name:</label>
              <input type="text" className="name childInfoInput"/>
            </div>
            <div className="ageInfo childInfoContainer">
              <label className="age childInfoLabel">Age:</label>
              <input type="text" className="ageNumber childInfoInput"/>
            </div>
            <div className="weightInfo childInfoContainer">
              <label className="weight childInfoLabel">Weight:</label>
              <input type="text"  className="weightNumber  childInfoInput"/>
            </div>
            <div className="headSizeInfo childInfoContainer">
              <label className="headSize childInfoLabel">Head Size:</label>
              <input type="text" className="headSizeNumber  childInfoInput"/>
            </div>
            <div className="buttonContainer">
              <button className="saveButton">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

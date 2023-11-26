import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <div className="banner">
        <div className="childInfoContainerHP">
          <div className="childPictureContainer">
          <i className="fa fa-plus fa-5x" aria-hidden="false"></i>
          </div>
          <div className="info">
            <div className="name">Name: </div>
            
            <div className="age">Age: </div>
            
            <div className="height">Height:</div>
           
            <div className="weight">Weight:</div>
          </div>
        </div>
        <div className="category">
          <div className="categoryName">
            <h1>Feeding</h1>
          </div>
          <div className="subCategories ">
            <button className="breastFeed">breast feed</button>
            <button className="bottleFeed">bottle feed</button>
          </div>
        </div>
      </div>
    </>
  );
};

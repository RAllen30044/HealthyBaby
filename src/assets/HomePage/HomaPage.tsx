import "./HomePage.css";

export const HomePage = () => {
  return (
      <>
      <div className="banner">
       <div className="image"></div>
       <div className="info">
            <label htmlFor="name">Name: </label>
            <br />
            <label htmlFor="age">Age: </label>
            <br />
            <label htmlFor="height">Height:</label>
            <br />
            <label htmlFor="weight">Weight:</label>
       </div>
       <div className="category">
            <div className="categoryName">
                  <h1>Feeding</h1>
            </div>
            <div className="subCategories">
                  <button className="breastFeed">breast feed</button>
                  <button className="bottleFeed">bottle feed</button>
            </div>
       </div>
      </div>
      </>
  );
};

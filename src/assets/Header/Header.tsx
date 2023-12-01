import "./Header.css";
import { useState } from "react";

export const Header = () => {
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
  const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <h5
              onClick={() => {
                setHiddenChildLinks(!hiddenChildLinks);
              }}
            >
              HB
            </h5>
            <div
              className={`childList ${
                hiddenChildLinks === true ? "" : "hidden"
              }`}
            >
              <div className="child">Child 1</div>
              <div className="child">Child 2</div>
            </div>
          </div>

          <div className="pages">
            <div className="home page">Home</div>
            <div className="about page">About</div>
            <div className="profile page">Profile</div>
            <div className="logOut page">Log Out</div>
            <div className="pagesDropDown ">
              <div
                className="hamburgerIcon"
                onClick={() => {
                  setHiddenPagesLinks(!hiddenPagesLinks);
                }}
              >
                &#9776;
              </div>
              <div
                className={`subPagesLinks ${
                  hiddenPagesLinks == true ? "" : "hidden"
                }`}
              >
                <div className="feedingLink link">Feeding</div>
                <div className="diaperLink link">Diaper</div>
                <div className="NappingLink link">Napping</div>
                <div className="IllnessLink link">Illness</div>
                <div className="AddChildLink link">Feeding</div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

import "./Header.css";
import { useState } from "react";

export const Header =()=>{

      const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
      const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
      return(
            <>
              <header>
        <nav>
          <div
            className="logo"
            onClick={() => {
              setHiddenChildLinks(!hiddenChildLinks);
            }}
          >
            <h5>HB</h5>
            <div
              className={`childList ${
                hiddenChildLinks === true ? "hidden" : ""
              }`}
            >
              <div className="child1">Child 1</div>
              <div className="child2">Child 2</div>
            </div>
          </div>

          <div className="links">
            <div className="home">Home</div>
            <div className="about">About</div>
            <div className="profile">Profile</div>
            <div className="logOut">Log Out</div>
            <div className="pagesDropDown">
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
                  hiddenPagesLinks == true ? "hidden" : ""
                }`}
              >
                <div className="feedingLink">Feeding</div>
                <div className="diaperLink">Diaper</div>
                <div className="NappingLink">Napping</div>
                <div className="IllnessLink">Illness</div>
                <div className="AddChildLink">Feeding</div>
              </div>
            </div>
          </div>
        </nav>
      </header>
            </>
      )
}
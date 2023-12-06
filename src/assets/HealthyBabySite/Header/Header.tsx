import { useActiveComponent } from "./ActiveComponent";
import "./Header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
  const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
  const { activeComponent, setActiveComponent } = useActiveComponent();
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
            <NavLink to="/home" className=" page">
              Home
            </NavLink>
            <NavLink to="/about" className=" page">
              About
            </NavLink>
            <NavLink to="/profile" className="page">
              Profile
            </NavLink>
            <div className="logOut page">Log Out</div>
            <div className="pagesDropDown ">
              <div className="linksContainer">
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
                  <div
                    className={`feedingLink link ${
                      activeComponent === "feeding" ? "selected" : ""
                    }`}
                    onClick={() => setActiveComponent("feeding")}
                  >
                    Feeding
                  </div>
                  <div
                    className={`diaperLink link ${
                      activeComponent === "diaper" ? "selected" : ""
                    }`}
                    onClick={() => setActiveComponent("diaper")}
                  >
                    Diaper
                  </div>
                  <div
                    className={`NappingLink link ${
                      activeComponent === "napping" ? "selected" : ""
                    }`}
                    onClick={() => setActiveComponent("napping")}
                  >
                    Napping
                  </div>
                  <div
                    className={`IllnessLink link ${
                      activeComponent === "illness" ? "selected" : ""
                    }`}
                    onClick={() => setActiveComponent("illness")}
                  >
                    Illness
                  </div>
                  <div
                    className={`AddChildLink link ${
                      activeComponent === "addChild" ? "selected" : ""
                    }`}
                    onClick={() => setActiveComponent("addChild")}
                  >
                    Add Child
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

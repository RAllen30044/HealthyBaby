import { useHistoryIDComponent } from "../../../HistoryProvider";
import { ChildInfo } from "../../HomePage/ChildInfo/ChildInfo";
import { useAuthProviderContext } from "../authenticationPage/authProvider";
import { useActiveComponent } from "./ActiveComponentProvider";
import "./Header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
  const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
  const { activeComponent, setActiveComponent } = useActiveComponent();
  const { childInfo, setChildId, childId } = useHistoryIDComponent();
  const { log, setLog } = useAuthProviderContext();
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
              {/* <div className="child">Child 1</div>
              <div className="child">Child 2</div> */}

              {childInfo.map((child) => {
                return (
                  <div
                    className={`child ${
                      childId === childInfo.indexOf(child) ? "selected" : ""
                    }`}
                    key={child.id}
                    onClick={() => {
                      setChildId(childInfo.indexOf(child));
                      setHiddenChildLinks(!hiddenChildLinks);
                    }}
                  >
                    {child.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pages">
            <NavLink
              to="/home"
              className={` pageLink ${log === "logIn" ? "hidden" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={` pageLink ${log === "logIn" ? "hidden" : ""}`}
            >
              About
            </NavLink>
            <NavLink
              to="/profile"
              className={` pageLink ${log === "logIn" ? "hidden" : ""}`}
            >
              Profile
            </NavLink>
            <NavLink
              to="/auth"
              className={` pageLink ${log === "logIn" ? "hidden" : ""}`}
              onClick={() => {
                setLog("logIn");
              }}
            >
              Log Out
            </NavLink>
            <NavLink
              to="/auth"
              className={` pageLink ${log === "logOut" ? "hidden" : ""}`}
            >
              Log In
            </NavLink>
            <NavLink
              to="/profile"
              className={` pageLink ${log === "logOut" ? "hidden" : ""}`}
            >
              Sign Up
            </NavLink>
            <div className={`pagesDropDown ${log === "logIn" ? "hidden" : ""}`}>
              <div className="linksContainer">
                <div
                  className="hamburgerIcon"
                  onClick={() => {
                    setHiddenPagesLinks(!hiddenPagesLinks);
                  }}
                >
                  &#9776;
                </div>
                <NavLink
                  to="/home"
                  className={`subPagesLinks ${
                    hiddenPagesLinks == true ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setHiddenPagesLinks(!hiddenPagesLinks);
                  }}
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
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

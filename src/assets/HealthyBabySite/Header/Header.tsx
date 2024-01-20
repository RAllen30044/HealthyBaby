import { useHistoryIDComponent } from "../../../HistoryProvider";

import { useChildrenProviderContext } from "../ProfilePage/profileChildrenProvider";

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
  const {  setUser, maybeUser } = useAuthProviderContext();
  console.log(childInfo);
  const getUser = localStorage.getItem("user");
  const {  myChildren } = useChildrenProviderContext();

  console.log(myChildren);

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <h5
              onClick={() => {
                if (getUser) {
                  setHiddenChildLinks(!hiddenChildLinks);
                } else {
                  return;
                }
              }}
            >
              HB
            </h5>
            <div
              className={`childList ${
                hiddenChildLinks === true ? "" : "hidden"
              }`}
            >
              {" "}
              {
                // .filter(child=> child.id === childId)
                //   .sort((a, b) => {
                //     if (a.name < b.name) {
                //       return -1;
                //     }
                //     if (a.name > b.name) {
                //       return 1;
                //     }
                //     return 0;
                //   })
              }
              {myChildren.map((child) => {
                return (
                  <div
                    className={`child ${
                      childId === myChildren.indexOf(child) ? "selected" : ""
                    }`}
                    key={child.id}
                    onClick={() => {
                      setChildId(myChildren.indexOf(child));
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
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
            >
              About
            </NavLink>
            <NavLink
              to="/profile"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
            >
              Profile
            </NavLink>
            <NavLink
              to="/auth"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
              }}
            >
              Log Out
            </NavLink>
            <NavLink
              to="/auth"
              className={` pageLink ${maybeUser ? "hidden" : ""}`}
            >
              Log In
            </NavLink>
            <NavLink
              to="/profile"
              className={` pageLink ${maybeUser ? "hidden" : ""}`}
            >
              Sign Up
            </NavLink>
            <div className={`pagesDropDown ${maybeUser ? "" : "hidden"}`}>
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

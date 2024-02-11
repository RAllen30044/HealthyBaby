import { setActiveComponentInLocalStorage } from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { updateChildDateAge } from "../../../api";
import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";

import { useAuthProviderContext } from "../authenticationPage/authProvider";
import { useActiveComponent } from "./ActiveComponentProvider";
import "./Header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type ActiveLink = "home" | "about" | "profile" | "add child" | "";
export const Header = () => {
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);
  const [activeLink, setActiveLink] = useState<ActiveLink>("home");
  const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
  const { activeComponent, setActiveComponent, setEditor } =
    useActiveComponent();

  const { childInfo, setChildId, childId, profileId } = useHistoryIDComponent();
  const { setUser, maybeUser } = useAuthProviderContext();

  const getUser = localStorage.getItem("user");



  return (
    <>
      <header>
        <nav>
          <div
            className="logo"
            onMouseLeave={() => {
              if (getUser) {
                setHiddenChildLinks(false);
              } else {
                return;
              }
            }}
            onMouseEnter={() => {
              if (getUser) {
                setHiddenChildLinks(true);
              } else {
                return;
              }
            }}
          >
            <i className="fa-solid fa-baby"></i>

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
              {childInfo
                .filter((childProfile) => childProfile.profileId === profileId)
                .map((childProfile) => {
                  return (
                    <div
                      className={`child ${
                        childId === childProfile.id ? "selected" : ""
                      }`}
                      key={childProfile.id}
                      onClick={() => {
                        setChildId(childProfile.id);
                        setHiddenChildLinks(!hiddenChildLinks);
                        localStorage.setItem(
                          "child",
                          JSON.stringify({
                            name: childProfile.name,
                            age: convertAgeToAppropriateAgeType(
                              childProfile.DOB
                            ),
                            DOB: childProfile.DOB,
                            gender: childProfile.gender,
                            height: childProfile.height,
                            weight: childProfile.weight,
                            headSize: childProfile.headSize,
                            profileId: childProfile.profileId,
                            id: childProfile.id,
                          })
                        );
                        updateChildDateAge(childProfile.DOB, childProfile.id);
                      }}
                    >
                      {childProfile.name}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="pages">
            <NavLink
              to="/home"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
              onClick={() => {
                setActiveComponent("feeding");
              }}
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
              to="/home"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
              onClick={() => {
                setActiveComponent("editProfile");
                setActiveComponentInLocalStorage("editProfile");
              }}
            >
              Edit Profile
            </NavLink>
            <NavLink
              to="/auth"
              className={` pageLink ${maybeUser ? "" : "hidden"}`}
              onClick={() => {
                localStorage.clear();
                setUser(null);
                setHiddenChildLinks(false);
                setHiddenPagesLinks(false);
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

            <section className="mobileDropSection">
              <div className={`linksDropDown  ${maybeUser ? "" : "hidden"}`}>
                <div className="mobileDropdownContainer">
                  <div
                    className="hamburgerIcon"
                    onClick={() => {
                      setHiddenPagesLinks(!hiddenPagesLinks);
                    }}
                    style={
                      hiddenPagesLinks === true ? { fontSize: "larger" } : {}
                    }
                  >
                    &#9776;
                  </div>
                  <div
                    className={`mobileLinksContainer ${
                      hiddenPagesLinks === true ? "" : "hidden"
                    }`}
                  >
                    <NavLink
                      to="/home"
                      className={` mobileLink ${maybeUser ? "" : "hidden"} ${
                        activeLink === "home" ? "selected" : ""
                      } `}
                      onClick={() => {
                        setActiveLink("home");
                        setActiveComponent("feeding");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="homeContainer"> Home</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/about"
                      className={` mobileLink ${maybeUser ? "" : "hidden"} ${
                        activeLink === "about" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setActiveLink("about");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="aboutContainer"> About</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/home"
                      className={` mobileLink ${maybeUser ? "" : "hidden"} ${
                        activeComponent === "editProfile" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setActiveLink("");
                        setActiveComponent("editProfile");
                        setActiveComponentInLocalStorage("editProfile");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="profileContainer">Edit Profile</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/home"
                      className={` mobileLink ${maybeUser ? "" : "hidden"}  ${
                        activeLink === "add child" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setEditor("not present");
                        setActiveLink("add child");
                        setActiveComponent("addChild");
                        setActiveComponentInLocalStorage("addChild");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="addChildContainer"> Add Child</div>
                      </div>
                    </NavLink>
                    <NavLink
                      to="/auth"
                      className={` mobileLink ${maybeUser ? "" : "hidden"}`}
                      onClick={() => {
                        localStorage.clear();
                        setUser(null);

                        setHiddenPagesLinks(false);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="logOutContainer"> Log Out</div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`landingPageHeader  ${maybeUser ? "hidden" : ""}`}
            >
              <NavLink
                to="/auth"
                className={` LandingPageLink ${maybeUser ? "hidden" : ""} `}
              >
                Log In
              </NavLink>

              <NavLink
                to="/profile"
                className={` LandingPageLink ${maybeUser ? "hidden" : ""}`}
              >
                Sign Up
              </NavLink>
            </section>

            <div className={`pagesDropDown ${maybeUser ? "" : "hidden"}`}>
              <div
                className="linksContainer"
                onMouseLeave={() => {
                  setHiddenPagesLinks(false);
                }}
                onMouseEnter={() => {
                  setHiddenPagesLinks(true);
                }}
              >
                <div
                  className="hamburgerIcon"
                  style={
                    hiddenPagesLinks === true ? { fontSize: "larger" } : {}
                  }
                >
                  &#9776;
                </div>
                <NavLink
                  to="/home"
                  className={`subPagesLinks  ${
                    hiddenPagesLinks == true ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setEditor("not present");
                    setHiddenPagesLinks(!hiddenPagesLinks);
                  }}
                >
                  <div
                    className={`feedingLink link ${
                      activeComponent === "feeding" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveComponent("feeding");
                      setActiveComponentInLocalStorage("feeding");
                    }}
                  >
                    Feeding
                  </div>
                  <div
                    className={`diaperLink link ${
                      activeComponent === "diaper" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveComponent("diaper");
                      setActiveComponentInLocalStorage("diaper");
                    }}
                  >
                    Diaper
                  </div>
                  <div
                    className={`nappingLink link ${
                      activeComponent === "napping" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveComponent("napping");
                      setActiveComponentInLocalStorage("napping");
                    }}
                  >
                    Napping
                  </div>
                  <div
                    className={`illnessLink link ${
                      activeComponent === "illness" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveComponent("illness");
                      setActiveComponentInLocalStorage("illness");
                    }}
                  >
                    Illness
                  </div>
                  <div
                    className={`addChildLink link ${
                      activeComponent === "addChild" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveComponent("addChild");
                      setActiveComponentInLocalStorage("addChild");
                    }}
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

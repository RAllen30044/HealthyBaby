import { setActiveComponentInLocalStorage } from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { updateChildDateAge } from "../../../api";
import { useChildInfo } from "../../HomePage/ChildPage/ChildInfoProvider";
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
  const {
    setChildName,
    setDOB,
    setGender,
    setHeight,
    setWeight,
    setHeadSize,
    setCurrentChildId,
  } = useChildInfo();
  const { childInfo, setChildId, childId, profileId } = useHistoryIDComponent();
  const { setUser, maybeUser, maybeChild, setLandingPage } =
    useAuthProviderContext();

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <div
              className={`logoActionContainer`}
              onMouseLeave={() => {
                if (maybeChild) {
                  setHiddenChildLinks(false);
                }
              }}
              onMouseEnter={() => {
                if (maybeChild) {
                  setHiddenChildLinks(true);
                }
              }}
            >
              <i className={`fa-solid fa-baby `}></i>

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
                  .filter(
                    (childProfile) => childProfile.profileId === profileId
                  )
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
                          setChildName(childProfile.name);
                          setGender(childProfile.gender);
                          setDOB(childProfile.DOB);
                          setHeadSize(childProfile.headSize);
                          setHeight(childProfile.height);
                          setWeight(childProfile.weight);
                          setCurrentChildId(childProfile.id);
                        }}
                      >
                        {childProfile.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="pages">
            <div className={`loggedInHeader ${maybeChild ? "" : "hidden"}`}>
              <NavLink
                to="/home"
                className={` pageLink `}
                onClick={() => {
                  setActiveComponent("feeding");
                }}
              >
                Home
              </NavLink>
              <NavLink to="/about" className={` pageLink `}>
                About
              </NavLink>
              <NavLink
                to="/home"
                className={` pageLink `}
                onClick={() => {
                  setActiveComponent("editProfile");
                  setActiveComponentInLocalStorage("editProfile");
                }}
              >
                Edit Profile
              </NavLink>
              <NavLink
                to="/auth"
                className={` pageLink `}
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  setHiddenChildLinks(false);
                  setHiddenPagesLinks(false);
                }}
              >
                Log Out
              </NavLink>
            </div>

            <div className={`loggedOutHeader ${maybeChild ? "hidden" : ""}`}>
              <NavLink
                to="/auth"
                className={` pageLink `}
                onClick={() => {
                  setLandingPage("on");
                }}
              >
                Log In
              </NavLink>
              <NavLink
                to="/profile"
                className={` pageLink `}
                onClick={() => {
                  setLandingPage("off");
                }}
              >
                Sign Up
              </NavLink>
            </div>

            <section className="mobileDropSection">
              <div className={`linksDropDown  ${maybeChild ? "" : "hidden"}`}>
                <div className="mobileDropdownContainer">
                  <div
                    className="hamburgerIcon"
                    onMouseEnter={() => {
                      setHiddenPagesLinks(true);
                    }}
                    onMouseLeave={() => {
                      setHiddenPagesLinks(false);
                    }}
                    // onClick={() => {
                    //   setHiddenPagesLinks(!hiddenPagesLinks);
                    // }}
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
                      className={` mobileLink  ${
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
                      className={` mobileLink  ${
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
                      className={` mobileLink  ${
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
                      className={` mobileLink   ${
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
                      className={` mobileLink `}
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

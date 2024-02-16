import {
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
} from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { updateChildDateAge } from "../../../api";
import { useChildInfo } from "../../HomePage/ChildPage/ChildInfoProvider";
import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";

import { useAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "./ActiveComponentProvider";
import "./Header.css";
import { useState } from "react";

type Color = "#A0C0FA" | "gray";

export const Header = () => {
  const [hiddenPagesLinks, setHiddenPagesLinks] = useState(false);

  const [hiddenChildLinks, setHiddenChildLinks] = useState(false);
  const {
    activeHomePageComponent,
    setActiveHomePageComponent,
    setActiveMainComponent,
    activeMainComponent,
    setEditor,
  } = useActiveComponent();
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
  const { setUser, maybeUser, maybeChild } = useAuthProviderContext();
  const [iconColor, setIconColor] = useState<Color>("#A0C0FA");
  const filterChildInfo = () => {
    return (
      <div className="filteredChildInfo">
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
                      age: convertAgeToAppropriateAgeType(childProfile.DOB),
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
    );
  };

  return (
    <>
      <header>
        <nav>
          <div className="logos">
            <div className="logo">
              <div
                className={`logoActionContainer`}
                onClick={() => {
                  setHiddenChildLinks(!hiddenChildLinks);
                  if (iconColor === "gray") {
                    setIconColor("#A0C0FA");
                  } else {
                    setIconColor("gray");
                  }
                }}
                onMouseLeave={() => {
                  setHiddenChildLinks(false);
                  setIconColor("#A0C0FA");
                }}
                onMouseEnter={() => {
                  setHiddenChildLinks(true);
                  setIconColor("gray");
                }}
              >
                <i
                  className={`fa-solid fa-baby `}
                  style={{ color: iconColor }}
                ></i>

                <div
                  className={`childList ${
                    maybeChild && hiddenChildLinks === true ? "" : "hidden"
                  }`}
                >
                  {filterChildInfo()}
                </div>
              </div>
            </div>
          </div>
          <div className="pages">
            <div className={`loggedInHeader ${maybeChild ? "" : "hidden"}`}>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                  setActiveHomePageComponent("feeding");
                  setActiveMainComponentInLocalStorage("feeding");
                }}
              >
                Home
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("about");
                  setActiveMainComponentInLocalStorage("about");
                }}
              >
                About
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("editProfile");
                  setActiveMainComponentInLocalStorage("editProfile");
                }}
              >
                Edit Profile
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  setHiddenChildLinks(false);
                  setHiddenPagesLinks(false);
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log Out
              </div>
            </div>

            <div className={`loggedOutHeader ${maybeChild ? "hidden" : ""}`}>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("landingPage");
                }}
              >
                Log In
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("signUp");
                }}
              >
                Sign Up
              </div>
            </div>

            <section className="mobileDropSection">
              <div className={`linksDropDown  ${maybeChild ? "" : "hidden"}`}>
                <div className="mobileDropdownContainer">
                  <div
                    className="hamburgerIcon"
                    onClick={() => {
                      setHiddenPagesLinks(!hiddenPagesLinks);
                    }}
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
                    <div
                      className={` mobileLink  ${
                        activeMainComponent === "home" ? "selected" : ""
                      } `}
                      onClick={() => {
                        setActiveMainComponent("home");
                        setActiveMainComponentInLocalStorage("home");
                        setActiveHomePageComponent("feeding");
                        setActiveHomePageComponentInLocalStorage("feeding");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="homeContainer"> Home</div>
                      </div>
                    </div>
                    <div
                      className={` mobileLink  ${
                        activeMainComponent === "about" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setActiveMainComponent("about");
                        setActiveMainComponentInLocalStorage("about");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="aboutContainer"> About</div>
                      </div>
                    </div>
                    <div
                      className={` mobileLink  ${
                        activeMainComponent === "editProfile" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setActiveMainComponent("editProfile");
                        setActiveMainComponentInLocalStorage("editProfile");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="profileContainer">Edit Profile</div>
                      </div>
                    </div>
                    <div
                      className={` mobileLink   ${
                        activeMainComponent === "addChild" ? "selected" : ""
                      }`}
                      onClick={() => {
                        setEditor("not present");

                        setActiveMainComponent("addChild");
                        setActiveMainComponentInLocalStorage("addChild");
                        setHiddenPagesLinks(!hiddenPagesLinks);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="addChildContainer"> Add Child</div>
                      </div>
                    </div>
                    <div
                      className={` mobileLink `}
                      onClick={() => {
                        localStorage.clear();
                        setUser(null);
                        setActiveMainComponent("landingPage");
                        setActiveMainComponentInLocalStorage("landingPage");
                        setHiddenPagesLinks(false);
                      }}
                    >
                      <div className="linkContainer">
                        <div className="logOutContainer"> Log Out</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`landingPageHeader  ${maybeUser ? "hidden" : ""}`}
            >
              <div
                className={` LandingPageLink ${maybeUser ? "hidden" : ""} `}
                onClick={() => {
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log In
              </div>

              <div
                className={` LandingPageLink ${maybeUser ? "hidden" : ""}`}
                onClick={() => {
                  setActiveMainComponent("signUp");
                  setActiveMainComponentInLocalStorage("signUp");
                }}
              >
                Sign Up
              </div>
            </section>

            <div className={`pagesDropDown ${maybeUser ? "" : "hidden"}`}>
              <div
                className="linksContainer"
                onClick={() => {
                  setHiddenPagesLinks(!hiddenPagesLinks);
                }}
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
                <div
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
                      activeHomePageComponent === "feeding" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("feeding");
                      setActiveHomePageComponentInLocalStorage("feeding");
                    }}
                  >
                    Feeding
                  </div>
                  <div
                    className={`diaperLink link ${
                      activeHomePageComponent === "diaper" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("diaper");
                      setActiveHomePageComponentInLocalStorage("diaper");
                    }}
                  >
                    Diaper
                  </div>
                  <div
                    className={`nappingLink link ${
                      activeHomePageComponent === "napping" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("napping");
                      setActiveHomePageComponentInLocalStorage("napping");
                    }}
                  >
                    Napping
                  </div>
                  <div
                    className={`illnessLink link ${
                      activeHomePageComponent === "illness" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("illness");
                      setActiveHomePageComponentInLocalStorage("illness");
                    }}
                  >
                    Illness
                  </div>
                  <div
                    className={`addChildLink link ${
                      activeMainComponent === "addChild" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActiveMainComponent("addChild");
                      setActiveMainComponentInLocalStorage("addChild");
                      setActiveHomePageComponent("");
                      setActiveHomePageComponentInLocalStorage("");
                    }}
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

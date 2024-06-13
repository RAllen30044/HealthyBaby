import {
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
  setIsSubmittedInLocalStorage,
} from "../../../ErrorHandling";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import { useChildInfo } from "../../HomePage/ChildPage/ChildInfoProvider";

// import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";
import { UseTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";

import { UseAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "./ActiveComponentProvider";
import "./Header.css";

export const Header = () => {
  const {
    activeHomePageComponent,
    setActiveHomePageComponent,
    setActiveMainComponent,
    activeMainComponent,
    setEditor,
    switchColors,
  } = useActiveComponent();
  const {
    chevronPosition,
    setChevronPosition,

    hiddenPagesLinks,
    setHiddenPagesLinks,
  } = useChildInfo();
  const { setDate, setTime, setIsSubmitted } = UseTimeInfo();
  const {
    // childInfo,
    setChildId,
    childId,
    profileChildren,
    setProfileChildren,
    setToken,
  } = UseHistoryIDComponent();
  const { setUser } = UseAuthProviderContext();

  console.log();

  const filterChildInfo = () => {
    return (
      <div
        className={`filteredChildInfo ${
          activeMainComponent !== "home" ? "hidden" : ""
        }`}
      >
        <div id="childIndicator">
          <p>Switch to Child</p>
          <div
            className="switchChild"
            onClick={() => {
              if (chevronPosition === "down") {
                setChevronPosition("up");
                setIsSubmitted(false);
                setIsSubmittedInLocalStorage("false");
                return;
              }
              setIsSubmitted(false);
              setIsSubmittedInLocalStorage("false");
              setChevronPosition("down");
            }}
          >
            {profileChildren
              .filter((child) => child.id === childId)
              .map((child) => child.name)}
            <div className="clickPositioning">
              <i className={`fa-solid fa-chevron-${chevronPosition}`}></i>
            </div>

            <div
              className={`childNameContainer ${
                chevronPosition === "down" ? "hidden" : ""
              }`}
            >
              {profileChildren.map((childProfile) => {
                return (
                  <div
                    className={`child ${
                      childId === childProfile.id ? "selectedChild" : ""
                    }`}
                    style={
                      childId === childProfile.id
                        ? { color: `${switchColors(activeHomePageComponent)}` }
                        : {}
                    }
                    key={childProfile.id}
                    onClick={() => {
                      const selectedChildId = childProfile.id;

                      setChildId(selectedChildId);
                      localStorage.setItem(
                        "childId",
                        JSON.stringify(selectedChildId)
                      );

                      setChevronPosition("down");
                    }}
                  >
                    {childProfile.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <nav className="largeScreenNav">
          <div className="logos largeScreen">
            <div className="logo">
              <div
                className={`logoActionContainer`}
                onClick={() => {
                  if (profileChildren.length > 0) {
                    setActiveHomePageComponent("feeding");
                    setActiveHomePageComponentInLocalStorage("feeding");
                    setActiveMainComponent("home");
                    setActiveMainComponentInLocalStorage("home");
                    setIsSubmitted(false);
                    setDate("");
                    setTime("");
                  }
                }}
              >
                <div className="babyIconContainer">
                  <img
                    className="babyIcon"
                    src="https://cdn0.iconfinder.com/data/icons/streamline-emoji-1/48/110-baby-3-1024.png"
                    alt="Baby Icon"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`switchToChild ${
              profileChildren.length > 0 ? "" : "hidden"
            }`}
          >
            {filterChildInfo()}
          </div>

          <div className="pages">
            <div
              className={`loggedInHeader ${
                profileChildren.length > 0 ? "" : "hidden"
              }`}
            >
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
                  setIsSubmitted(false);
                }}
              >
                Home
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("howTo");
                  setActiveMainComponentInLocalStorage("howTo");
                  setIsSubmitted(false);
                  setDate("");
                  setTime("");
                }}
              >
                How To
              </div>
              <div
                className={`pageLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("addChild");
                  setActiveMainComponentInLocalStorage("addChild");
                  setActiveHomePageComponent("");
                  setActiveHomePageComponentInLocalStorage("");
                }}
              >
                Add Child
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("editProfile");
                  setActiveMainComponentInLocalStorage("editProfile");
                  setIsSubmitted(false);
                  setDate("");
                  setTime("");
                }}
              >
                Edit Profile
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                  setProfileChildren([]);
                  setHiddenPagesLinks(false);
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                  setIsSubmitted(false);
                  setToken(null);
                  setDate("");
                  setTime("");
                }}
              >
                Log Out
              </div>
            </div>

            <div
              className={`loggedOutHeader ${
                profileChildren.length === 0 ? "" : "hidden"
              }`}
            >
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("landingPage");
                  setIsSubmitted(false);
                }}
              >
                Log In
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setActiveMainComponent("howTo");
                  setActiveMainComponentInLocalStorage("howTo");
                  setIsSubmitted(false);
                  setDate("");
                  setTime("");
                }}
              >
               How To
              </div>
              <div
                className={` pageLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("signUp");
                }}
              >
                Sign Up
              </div>
            </div>

            <section
              className={`landingPageHeader  ${
                profileChildren.length < 0 ? "hidden" : ""
              }`}
            >
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log In
              </div>
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("howTo");
                  setActiveMainComponentInLocalStorage("howTo");
                }}
              >
              How To
              </div>
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("signUp");
                  setActiveMainComponentInLocalStorage("signUp");
                }}
              >
                Sign Up
              </div>
            </section>

            <div
              className={`pagesDropDown ${
                profileChildren.length > 0 ? "" : "hidden"
              }`}
              onClick={() => {}}
            >
              <div
                className="linksContainer"
                onClick={() => {
                  setHiddenPagesLinks(!hiddenPagesLinks);
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
                      setIsSubmitted(false);
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("feeding");
                      setActiveHomePageComponentInLocalStorage("feeding");
                      if (activeHomePageComponent !== "feeding") {
                        setDate("");
                        setTime("");
                      }
                    }}
                  >
                    Feeding
                  </div>
                  <div
                    className={`diaperLink link ${
                      activeHomePageComponent === "diaper" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("diaper");
                      setActiveHomePageComponentInLocalStorage("diaper");
                      if (activeHomePageComponent !== "diaper") {
                        setDate("");
                        setTime("");
                      }
                    }}
                  >
                    Diaper
                  </div>
                  <div
                    className={`nappingLink link ${
                      activeHomePageComponent === "napping" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("napping");
                      setActiveHomePageComponentInLocalStorage("napping");
                      if (activeHomePageComponent !== "napping") {
                        setDate("");
                        setTime("");
                      }
                    }}
                  >
                    Napping
                  </div>
                  <div
                    className={`illnessLink link ${
                      activeHomePageComponent === "illness" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("illness");
                      setActiveHomePageComponentInLocalStorage("illness");
                      if (activeHomePageComponent !== "illness") {
                        setDate("");
                        setTime("");
                      }
                    }}
                  >
                    Illness
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <section className="mobileDropSection">
          <nav className="smallScreenNav">
            <div className="logos smallScreen">
              <div className="logo">
                <div
                  className={`logoActionContainer`}
                  onClick={() => {
                    if (profileChildren.length === 0) {
                      return;
                    }
                    setIsSubmitted(false);
                    setActiveHomePageComponent("feeding");
                    setActiveHomePageComponentInLocalStorage("feeding");
                    setActiveMainComponent("home");
                    setActiveMainComponentInLocalStorage("home");
                    setDate("");
                    setTime("");
                  }}
                >
                  <div className="babyIconContainer">
                    <img
                      className="babyIcon"
                      src="https://cdn0.iconfinder.com/data/icons/streamline-emoji-1/48/110-baby-3-1024.png"
                      alt="babyIcon"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`switchToChild ${
                profileChildren.length > 0 ? "" : "hidden"
              }`}
            >
              {filterChildInfo()}
            </div>
            <div
              className={`linksDropDown  ${
                profileChildren.length > 0 ? "" : "hidden"
              }`}
            >
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
                  <div
                    className={` mobileLink  ${
                      activeMainComponent === "home" ? "selected" : ""
                    } `}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("home");
                      setActiveMainComponentInLocalStorage("home");
                      setActiveHomePageComponent("feeding");
                      setActiveHomePageComponentInLocalStorage("feeding");
                      setHiddenPagesLinks(!hiddenPagesLinks);
                      setDate("");
                      setTime("");
                    }}
                  >
                    <div className="linkContainer">
                      <div className="homeContainer"> Home</div>
                    </div>
                  </div>
                  <div
                    className={` mobileLink  ${
                      activeMainComponent === "howTo" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("howTo");
                      setActiveMainComponentInLocalStorage("howTo");
                      setDate("");
                      setTime("");
                      setHiddenPagesLinks(!hiddenPagesLinks);
                    }}
                  >
                    <div className="linkContainer">
                      <div className="aboutContainer"> How To</div>
                    </div>
                  </div>
                  <div
                    className={` mobileLink  ${
                      activeMainComponent === "editProfile" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveMainComponent("editProfile");
                      setActiveMainComponentInLocalStorage("editProfile");
                      setHiddenPagesLinks(!hiddenPagesLinks);
                      setDate("");
                      setTime("");
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
                      setIsSubmitted(false);
                      setActiveMainComponent("addChild");
                      setActiveMainComponentInLocalStorage("addChild");
                      setHiddenPagesLinks(!hiddenPagesLinks);
                      setDate("");
                      setTime("");
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
                      setIsSubmitted(false);
                      setUser(null);
                      setProfileChildren([]);
                      setActiveMainComponent("landingPage");
                      setActiveMainComponentInLocalStorage("landingPage");
                      setHiddenPagesLinks(false);
                      setToken(null);
                    }}
                  >
                    <div className="linkContainer">
                      <div className="logOutContainer"> Log Out</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mobileLanding ${
                profileChildren.length > 0 ? "hidden" : ""
              }`}
            >
              <div
                className={`logIn mobileLandingLink`}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log In
              </div>
              <div
                className={` about mobileLandingLink  `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("howTo");
                  setActiveMainComponentInLocalStorage("howTo");
                  setDate("");
                  setTime("");
                  setHiddenPagesLinks(!hiddenPagesLinks);
                }}
              >
                <div className="linkContainer">
                  <div className="aboutContainerLanding"> How To</div>
                </div>
              </div>
              <div
                className={`signUp mobileLandingLink `}
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveMainComponent("signUp");
                  setActiveMainComponentInLocalStorage("signUp");
                }}
              >
                Sign Up
              </div>
            </div>
          </nav>
        </section>
      </header>
    </>
  );
};

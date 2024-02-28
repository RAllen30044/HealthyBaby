import {
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
} from "../../../ErrorHandling";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import { useChildInfo } from "../../HomePage/ChildPage/ChildInfoProvider";

import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";

import { useAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "./ActiveComponentProvider";
import "./Header.css";

export const Header = () => {
  const {
    activeHomePageComponent,
    setActiveHomePageComponent,
    setActiveMainComponent,
    activeMainComponent,
    setEditor,
    nameColors,
    switchColors,
  } = useActiveComponent();
  const {
    cheveronPosition,
    setCheveronPosition,
    hiddenPagesLinks,
    setHiddenPagesLinks,
  } = useChildInfo();

  const { childInfo, setChildId, childId, profileId } = useHistoryIDComponent();
  const { setUser, maybeChild } = useAuthProviderContext();

  const filterChildInfo = () => {
    return (
      <div
        className={`filteredChildInfo ${
          activeMainComponent !== "home" ? "hidden" : ""
        }`}
      >
        <div
          className="switchChild"
          onClick={() => {
            if (cheveronPosition === "down") {
              setCheveronPosition("up");
              return;
            }
            setCheveronPosition("down");
          }}
        >
          Switch Child
          <div className="clickPositioning">
            <i className={`fa-solid fa-chevron-${cheveronPosition}`}></i>
          </div>
        </div>
        <div
          className={`childNameContainer ${
            cheveronPosition === "down" ? "hidden" : ""
          }`}
        >
          {childInfo
            .filter((childProfile) => childProfile.profileId === profileId)
            .map((childProfile) => {
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
                    const selectedChildProfile = childInfo.find(
                      (childProfile) => childProfile.id === selectedChildId
                    );

                    if (selectedChildProfile) {
                      setChildId(selectedChildId);

                      setCheveronPosition("down");
                      localStorage.setItem(
                        "child",
                        JSON.stringify({
                          name: selectedChildProfile.name,
                          age: convertAgeToAppropriateAgeType(
                            selectedChildProfile.DOB
                          ),
                          DOB: selectedChildProfile.DOB,
                          gender: selectedChildProfile.gender,
                          height: selectedChildProfile.height,
                          weight: selectedChildProfile.weight,
                          headSize: selectedChildProfile.headSize,
                          profileId: selectedChildProfile.profileId,
                          id: selectedChildProfile.id,
                        })
                      );
                    }
                  }}
                >
                  {childProfile.name}
                </div>
              );
            })}
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
                  setActiveHomePageComponent("feeding");
                  setActiveHomePageComponentInLocalStorage("feeding");
                  setActiveMainComponent("home");
                  setActiveMainComponentInLocalStorage("home");
                }}
              >
                <i
                  className={`fa-solid fa-baby `}
                  style={{ color: "#a0c0fa" }}
                ></i>
              </div>
            </div>
          </div>

          <div className={`switchToChild ${maybeChild ? "" : "hidden"}`}>
            {filterChildInfo()}
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
                About Us
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
                  setActiveMainComponent("about");
                  setActiveMainComponentInLocalStorage("about");
                }}
              >
                About Us
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

            <section
              className={`landingPageHeader  ${maybeChild ? "hidden" : ""}`}
            >
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log In
              </div>
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setActiveMainComponent("about");
                  setActiveMainComponentInLocalStorage("about");
                }}
              >
                About Us
              </div>
              <div
                className={` LandingPageLink `}
                onClick={() => {
                  setActiveMainComponent("signUp");
                  setActiveMainComponentInLocalStorage("signUp");
                }}
              >
                Sign Up
              </div>
            </section>

            <div
              className={`pagesDropDown ${maybeChild ? "" : "hidden"}`}
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

        <section className="mobileDropSection">
          <nav className="smallScreenNav">
            <div className="logos smallScreen">
              <div className="logo">
                <div
                  className={`logoActionContainer`}
                  onClick={() => {
                    if (!maybeChild) {
                      return;
                    }
                    setActiveHomePageComponent("feeding");
                    setActiveHomePageComponentInLocalStorage("feeding");
                    setActiveMainComponent("home");
                    setActiveMainComponentInLocalStorage("home");
                  }}
                >
                  <i
                    className={`fa-solid fa-baby `}
                    style={{ color: "#a0c0fa" }}
                  ></i>
                </div>
              </div>
            </div>

            <div className={`switchToChild ${maybeChild ? "" : "hidden"}`}>
              {filterChildInfo()}
            </div>
            <div className={`linksDropDown  ${maybeChild ? "" : "hidden"}`}>
              <div className="mobileDropdownContainer">
                <div
                  className="hamburgerIcon"
                  onClick={() => {
                    setHiddenPagesLinks(!hiddenPagesLinks);
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
                      <div className="aboutContainer"> About Us</div>
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

            <div className={`mobileLanding ${maybeChild ? "hidden" : ""}`}>
              <div
                className={`logIn`}
                onClick={() => {
                  setActiveMainComponent("landingPage");
                  setActiveMainComponentInLocalStorage("landingPage");
                }}
              >
                Log In
              </div>
              <div
                className={`signUp`}
                onClick={() => {
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

import { useEffect, useRef, useState } from "react";

import { UseAuthProviderContext } from "./authProvider";
import "./LandingPage.css";
// import toast from "react-hot-toast";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import {
  getIsSubmittedFromLocalStorage,
  // firstAvailableChild,
  // getIsSubmittedFromLocalStorage,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
  setIsSubmittedInLocalStorage,
} from "../../../ErrorHandling";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
// import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPoo,
  faChildDress,
  faChild,
  faBaby,
  faBabyCarriage,
  faBowlFood,
  faAppleWhole,
  faSyringe,
  faBed,
  faDisease,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {
  authorization,
  getProfilesChildren,
  getProfilesFirstChild,
} from "../../../../callApis";
import toast from "react-hot-toast";


const icons = [
  faPoo,
  faChildDress,
  faChild,
  faBaby,
  faBabyCarriage,
  faBowlFood,
  faAppleWhole,
  faSyringe,
  faBed,
  faDisease,
];

export const LandingPage = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const {

    setShowAddChildError,

    setPassword,
  } = UseAuthProviderContext();
  const { setToken, setChildId, setProfileUsername } = UseHistoryIDComponent();
  const { setActiveMainComponent, setActiveHomePageComponent } =
    useActiveComponent();

  const [displayedIcons, setDisplayedIcons] = useState<IconDefinition[]>([
    ...icons,
  ]);
  const [loadIndex, setLoadIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadIcons = () => {
    setDisplayedIcons((prevIcons) => [
      ...prevIcons,
      ...icons.slice(loadIndex, loadIndex + (5 % icons.length)),
    ]);
    setLoadIndex((prevIndex) => (prevIndex + 5) % icons.length);
  };

  useEffect(() => {
    loadIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          loadIcons();
        }
      }
    };
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadIndex]);

  return (
    <>
      <div className={`landingPage `}>
        <h1> Health <span id="T">T</span> Baby</h1>
      </div>
      {/* <ScrollingAnimation /> */}
      <div className="healthyBabyIconsContainer" ref={containerRef}>
        <ul className="healthyBabyIcons">
          {displayedIcons.map((icon, index) => {
            return (
              <li className={`healthyBabyIcon ${icon.iconName}`} key={index}>
                <FontAwesomeIcon icon={icon} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="authentication">
        <div className="card">
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              // isUserValid(userNameInput, passwordInput);

              const authorize = await authorization(
                userNameInput.toLowerCase().trimEnd(),
                passwordInput
              );

              if (!authorize.token ) {
                toast.error("Username and/or Password Not found");

                setUserNameInput("");
                setPasswordInput("");
                return;
              }
              const children = await getProfilesChildren(authorize.token);

              if (children.length === 0) {
                setActiveMainComponent("addChild");
                setActiveMainComponentInLocalStorage("addChild");
                setIsSubmittedInLocalStorage("true");
                setProfileUsername(userNameInput);
                setPassword(passwordInput);
                setShowAddChildError(getIsSubmittedFromLocalStorage());
                return;
              }

              setToken(authorize.token);
              localStorage.setItem("token", authorize.token);
              getProfilesFirstChild(authorize.token).then((child) => {
                setChildId(child.id);
                localStorage.setItem("childId", JSON.stringify(child.id));
              });
              setPassword(passwordInput);
              setProfileUsername(userNameInput);
              localStorage.setItem("profileUserName", userNameInput);
              if (authorize.token) {
                setPassword("");
                setUserNameInput("");
                setPasswordInput("");
              }
              setActiveMainComponentInLocalStorage("home");
              setActiveMainComponent("home");
              setActiveHomePageComponentInLocalStorage("feeding");
              setActiveHomePageComponent("feeding");
            }}
          >
            <h3>Login</h3>
            <div className="username">
              <label htmlFor="user">Username: </label>
              <input
                className="input usernameInput"
                type="text"
                value={userNameInput}
                autoComplete="username"
                onChange={(e) => {
                  setUserNameInput(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <label htmlFor="user">Password: </label>
              <input
                className="input passwordInput"
                type="password"
                value={passwordInput}
                autoComplete="current-password"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="logInButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

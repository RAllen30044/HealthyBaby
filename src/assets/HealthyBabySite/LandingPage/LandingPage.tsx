import { useEffect, useRef, useState } from "react";

import { useAuthProviderContext } from "./authProvider";
import "./LandingPage.css";
import { getProfileData, updateChildDateAge } from "../../../api";
import toast from "react-hot-toast";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  firstAvailableChild,
  setActiveHomePageComponentInLocalStorage,
  setActiveMainComponentInLocalStorage,
} from "../../../ErrorHandling";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { convertAgeToAppropriateAgeType } from "../../HomePage/TimeInfo/TimeConversion";
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
  const { loggedIn, setLog, setLandingPage } = useAuthProviderContext();
  const { setProfileId, childInfo } = useHistoryIDComponent();
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
    loadIcons(); // Initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          // Trigger before hitting the bottom
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

  const isUserValid = (username: string, password: string) => {
    return getProfileData()
      .then((users) => {
        const userExist = users.some(
          (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
        );
        const user = users.find(
          (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
        );

        if (userExist) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: user?.username,
              password: user?.password,
              id: user?.id,
            })
          );

          firstAvailableChild(childInfo, user);
          if (firstAvailableChild(childInfo, user)) {
            localStorage.setItem(
              "child",
              JSON.stringify({
                name: firstAvailableChild(childInfo, user)?.name,
                age: convertAgeToAppropriateAgeType(
                  firstAvailableChild(childInfo, user)?.DOB || "Error"
                ),
                DOB: firstAvailableChild(childInfo, user)?.DOB,
                gender: firstAvailableChild(childInfo, user)?.gender,
                weight: firstAvailableChild(childInfo, user)?.weight,
                height: firstAvailableChild(childInfo, user)?.height,
                headSize: firstAvailableChild(childInfo, user)?.headSize,
                profileId: firstAvailableChild(childInfo, user)?.profileId,
                id: firstAvailableChild(childInfo, user)?.id,
              })
            );
            updateChildDateAge(
              convertAgeToAppropriateAgeType(
                firstAvailableChild(childInfo, user)?.DOB || "Error"
              ),
              firstAvailableChild(childInfo, user)?.id || 0
            );
          }
          toast.success("Success");

          loggedIn(userNameInput, passwordInput);
          setLog("logOut");
          // const userID = localStorage.getItem("user");

          setLandingPage("off");
          setActiveHomePageComponent("feeding");
          setActiveHomePageComponentInLocalStorage("feeding");
          setActiveMainComponent("home");
          setActiveMainComponentInLocalStorage("home");

          return;
        } else {
          toast.error("Username and/or Password Not found");
          return;
        }
      })
      .then(() => {
        const userID = localStorage.getItem("user");
        if (userID) {
          setProfileId(JSON.parse(userID).id);
        }
      });
  };
  return (
    <>
      <div className={`landingPage `}>
        <h1> Healthy Baby</h1>
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
            onSubmit={(e) => {
              e.preventDefault();
              isUserValid(userNameInput, passwordInput);
              setPasswordInput("");
              setUserNameInput("");
            }}
          >
            <h3>Login</h3>
            <div className="username">
              <label htmlFor="user">Username: </label>
              <input
                type="text"
                value={userNameInput}
                onChange={(e) => {
                  setUserNameInput(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <label htmlFor="user">Password: </label>
              <input
                type="password"
                value={passwordInput}
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

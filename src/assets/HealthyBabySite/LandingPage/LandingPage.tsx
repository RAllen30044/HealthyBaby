import { useEffect, useRef, useState } from "react";

// import { UseAuthProviderContext } from "./authProvider";
import "./LandingPage.css";
// import toast from "react-hot-toast";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import {
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
  // const {
  // // loggedIn,
  // // setLog,
  // // setShowAddChildError,
  // // showAddChildError,
  // //   setUsername,
  // //   setPassword,
  // } = useAuthProviderContext();
  const { setToken, setChildId } = UseHistoryIDComponent();
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

  // const isUserValid = (username: string, password: string) => {
  //   return getAllProfiles()
  //     .then((users) => {
  //       const userExist = users.some(
  //         (user) =>
  //           user.username.toLowerCase() === username.toLowerCase() &&
  //           user.password === password
  //       );
  //       const user = users.find(
  //         (user) =>
  //           user.username.toLowerCase() === username.toLowerCase() &&
  //           user.password === password
  //       );

  //       if (userExist) {
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({
  //             username: user?.username,
  //             password: user?.password,
  //             // id: user?.id,
  //           })
  //         );
  //         console.log(childInfo);

  //         console.log(user);

  //         firstAvailableChild(childInfo, user);
  //         const firstChild = childInfo.find(
  //           (child) => child.profileUsername === user?.username
  //         );
  //         console.log(firstChild?.id);

  //         if (firstAvailableChild(childInfo, user)) {
  //           console.log(firstAvailableChild(childInfo, user));
  //           localStorage.setItem(
  //             "child",
  //             JSON.stringify({
  //               name: firstAvailableChild(childInfo, user)?.name,
  //               age: convertAgeToAppropriateAgeType(
  //                 firstAvailableChild(childInfo, user)?.DOB || "Error"
  //               ),
  //               DOB: firstAvailableChild(childInfo, user)?.DOB,
  //               gender: firstAvailableChild(childInfo, user)?.gender,
  //               weight: firstAvailableChild(childInfo, user)?.weight,
  //               height: firstAvailableChild(childInfo, user)?.height,
  //               headSize: firstAvailableChild(childInfo, user)?.headSize,
  //               profileUsername: firstAvailableChild(childInfo, user)
  //                 ?.profileUsername,
  //               id: firstAvailableChild(childInfo, user)?.id,
  //             })
  //           );
  //         }
  //         toast.success("Success");

  //         // loggedIn(userNameInput, passwordInput);
  //         setLog("logOut");
  //         // const userID = localStorage.getItem("user");
  //         if (!firstAvailableChild(childInfo, user)) {
  //           setActiveMainComponent("addChild");
  //           setActiveMainComponentInLocalStorage("addChild");
  //           setIsSubmittedInLocalStorage("true");
  //           setShowAddChildError(getIsSubmittedFromLocalStorage());
  //           console.log(showAddChildError);

  //           return;
  //         }

  //         setIsSubmittedInLocalStorage("false");
  //         setShowAddChildError(getIsSubmittedFromLocalStorage());
  //         setActiveHomePageComponent("feeding");
  //         setActiveHomePageComponentInLocalStorage("feeding");
  //         setActiveMainComponent("home");
  //         setActiveMainComponentInLocalStorage("home");

  //         return;
  //       } else {
  //         toast.error("Username and/or Password Not found");
  //         return;
  //       }
  //     })
  //     .then(() => {
  //       const userID = localStorage.getItem("user");
  //       if (userID) {
  //         setProfileId(JSON.parse(userID).id);
  //       }
  //     });
  // };
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
            onSubmit={async (e) => {
              e.preventDefault();
              // isUserValid(userNameInput, passwordInput);
              const authorize = await authorization(
                userNameInput.toLowerCase(),
                passwordInput
              );

              if (!authorize.token) {
                console.log("Username and/or Password Not found");
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
                return;
              }

              setToken(authorize.token);
              localStorage.setItem("token", authorize.token);
              getProfilesFirstChild(authorize.token).then((profile) => {
                setChildId(profile.id);
                localStorage.setItem("childId", JSON.stringify(profile.id));
              });

              setUserNameInput("");
              setPasswordInput("");
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
                className="input"
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
                className="input passwordInput"
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

import { useState } from "react";

import "./authenticationPage.css";
import { useAuthProviderContext } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../../api";
import toast from "react-hot-toast";
import { useHistoryIDComponent } from "../../../HistoryProvider";
import {
  firstAvailableChild,
  setActiveComponentInLocalStorage,
} from "../../../ErrorHandling";
import { useActiveComponent } from "../Header/ActiveComponentProvider";

export const AuthenticationPage = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const { loggedIn, setLog } = useAuthProviderContext();
  const { setProfileId, childInfo } = useHistoryIDComponent();
  const { setActiveComponent } = useActiveComponent();
  const navigate = useNavigate();

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
        console.log(userExist);

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
                age: firstAvailableChild(childInfo, user)?.age,
                gender: firstAvailableChild(childInfo, user)?.gender,
                weight: firstAvailableChild(childInfo, user)?.weight,
                height: firstAvailableChild(childInfo, user)?.height,
                headSize: firstAvailableChild(childInfo, user)?.headSize,
                profileId: firstAvailableChild(childInfo, user)?.profileId,
                id: firstAvailableChild(childInfo, user)?.id,
              })
            );
          }
          toast.success("Success");
          console.log(userExist);
          loggedIn(userNameInput, passwordInput);
          setLog("logOut");
          const userID = localStorage.getItem("user");

          console.log(userID);
          setActiveComponent("feeding");
          setActiveComponentInLocalStorage("feeding");
          navigate("/home");
          console.log(JSON.stringify(user));

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

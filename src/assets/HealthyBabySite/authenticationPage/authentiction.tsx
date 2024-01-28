import { useState } from "react";

import "./authenticationPage.css";
import { useAuthProviderContext } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../../api";
import toast from "react-hot-toast";
import { useHistoryIDComponent } from "../../../HistoryProvider";

export const AuthenticationPage = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const { loggedIn, user } = useAuthProviderContext();
  const { setProfileId } = useHistoryIDComponent();
  const navigate = useNavigate();
  console.log(user);

  const isUserValid = (username: string, password: string) => {
    return getProfileData()
      .then((users) => {
        const userExist = users.some(
          (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
        );

        if (userExist) {
          toast.success("Success");
          console.log(userExist);

          loggedIn(username, password);
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

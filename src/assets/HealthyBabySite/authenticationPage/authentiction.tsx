import { useEffect, useState } from "react";
import { getProfileData } from "../../../api";
import { User } from "../../../Types";
import toast from "react-hot-toast";
import "./authenticationPage.css";
import { useAuthProviderContext } from "./authProvider";
import {  useNavigate } from "react-router-dom";

export const AuthenticationPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const { setLog } = useAuthProviderContext();
  const navigate = useNavigate();

  console.log(JSON.stringify(user));

  const isUserValid = (email: string, password: string) => {
    return getProfileData().then((users) => {
      const userExist = users.some(
        (user) =>
          user.userEmail.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (userExist) {
        toast.success("Success");
        setLog("logOut");
        navigate("/home");
        return true;
      } else {
        toast.error("Try Again");
        return;
      }
    });
  };
  console.log(user);

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
    }
  }, []);

  return (
    <>
      <div className="authentication">
        <div className="card">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              isUserValid(userNameInput, passwordInput)
                .then(() => {
                  setUser({ username: userNameInput, password: passwordInput });
                })
                .then(() => {
                localStorage.setItem("users", JSON.stringify(user));
                });
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

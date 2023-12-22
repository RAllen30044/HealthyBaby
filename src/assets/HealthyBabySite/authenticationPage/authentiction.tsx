import { useEffect, useState } from "react";
import { getProfileData } from "../../../api";
import { User } from "../../../Types";
import toast from "react-hot-toast";
import "./authenticationPage.css";
import { useAuthProviderContext } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const AuthenticationPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const { setLog } = useAuthProviderContext();
  const navigate= useNavigate();  
  const isUserValid = (username: string, password: string) => {
    return getProfileData().then((users) => {
      const userExist = users.some(
        (user) => user.username === username && user.password === password
      );
      console.log(userExist);

      if (userExist) {
        toast.success("Success");
        setLog("logOut");
        navigate("/home")
        return true;
      } else {
        toast.error("Try Again");
        return false;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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

                  localStorage.setItem("user", JSON.stringify(user));
                })
                .then(() => {
                  setUserNameInput("");
                  setPasswordInput("");
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
                type="text"
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

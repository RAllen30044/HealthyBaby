import { useState } from "react";

import "./authenticationPage.css";
import { useAuthProviderContext } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const AuthenticationPage = () => {
  // const [user, setUser] = useState<User | null>(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const { isUserValid, setUser, user } = useAuthProviderContext();
  const navigate = useNavigate();
  console.log(user);

  return (
    <>
      <div className="authentication">
        <div className="card">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              isUserValid(userNameInput, passwordInput).finally(()=>{
                navigate("/home")
              })
             
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

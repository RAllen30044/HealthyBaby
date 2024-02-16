import { useState } from "react";
import "./ProfilePage.css";
import { postInfo, profileUrl } from "../../../api";
import { useTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";
import {
  preventKeyingNumbers,
  preventKeyingSpaces,
} from "../../../ErrorHandling";
import toast from "react-hot-toast";

import { useAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { useHistoryIDComponent } from "../../../HistoryProvider";
// import { ProfileInfoTypes } from "../../../Types";

export const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>("");
  // const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, setLoading, isSubmitted, setIsSubmitted } = useTimeInfo();

  const { loggedIn, maybeUser, setPassword, password } =
    useAuthProviderContext();
  const { setActiveMainComponent } = useActiveComponent();
  const { setProfileId, profile } = useHistoryIDComponent();

  const passwordsDoMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  const doesUsernameExist = (username: string) => {
    return profile.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  };

  const passwordErrorMessage = "Passwords do not match";
  const shouldShowPasswordErrorMessage =
    isSubmitted && !passwordsDoMatch(password, confirmPassword);
  const shouldShowUsernameErrorMessage =
    isSubmitted && doesUsernameExist(username);
  const usernameErrorMessage = "Username already Exist";

  return (
    <>
      <div className="profilePage">
        <h1>Create Profile</h1>
        <div className="profile">
          <form
            action="POST"
            className="profileForm"
            onSubmit={(e) => {
              e.preventDefault();
              if (!passwordsDoMatch(password, confirmPassword)) {
                setIsSubmitted(true);

                return;
              }

              if (doesUsernameExist(username)) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);

              return postInfo(
                {
                  username: username,
                  password: password,
                  caregiver: childCaregiver,
                },
                profileUrl
              )
                .then((data) => {
                  toast.success("Profile Saved");
                  return data.json();
                })
                .then((data) => {
                  setActiveMainComponent("addChild");
                  if (!maybeUser) {
                    const username = JSON.parse(JSON.stringify(data)).username;

                    const userPassword = JSON.parse(
                      JSON.stringify(data)
                    ).password;
                    const userId = JSON.parse(JSON.stringify(data)).id;
                    setProfileId(userId);
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        username: username,
                        password: userPassword,
                        caregiver: childCaregiver,
                        id: userId,
                      })
                    );
                  }
                })

                .then(() => {
                  loggedIn(username, password);
                  setLoading(false);
                })
                .catch((e) => {
                  toast.error(e);
                });
            }}
          >
            <div className="inputContainer">
              <label htmlFor="name" className="profileLable">
                Username:
              </label>

              <input
                type="text"
                name="name"
                id="name"
                className="profileInput"
                value={username}
                onChange={(e) => {
                  setUsername(preventKeyingSpaces(e.target.value));
                }}
              />
            </div>
            {shouldShowUsernameErrorMessage && (
              <ErrorMessage message={usernameErrorMessage} show={true} />
            )}

            <div className="inputContainer">
              <label htmlFor="caregiver" className="profileLable">
                Child(ren) Caregiver:{" "}
              </label>
              <input
                type="text"
                name="caregiver"
                id="caregiver"
                className="profileInput"
                value={childCaregiver}
                onChange={(e) => {
                  setChildCaregiver(preventKeyingNumbers(e.target.value));
                }}
              />
            </div>

            <div className={`inputContainer ${maybeUser ? "hidden" : ""}`}>
              <label htmlFor="password" className="profileLable">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="profileInput"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={`inputContainer ${maybeUser ? "hidden" : ""}`}>
              <label htmlFor="password" className="profileLable">
                Confirm New Password:
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="profileInput"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            {shouldShowPasswordErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className={`inputContainer ${maybeUser ? "" : "hidden"}`}>
              <label htmlFor="password" className="profileLable">
                New Password:
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="profileInput"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={`inputContainer ${maybeUser ? "" : "hidden"}`}>
              <label htmlFor="password" className="profileLable">
                Confirm New Password:
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="profileInput"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            {shouldShowPasswordErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className="buttonContainer">
              <button className="saveButton" disabled={loading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import "./ProfilePage.css";
import {
  authorization,
  getAllProfileUserNames,
  getProfile,
  postInfo,
  profileUrl,
} from "../../../../callApis";
import { UseTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";
import {
  preventKeyingNumbers,
  preventKeyingSpaces,
} from "../../../ErrorHandling";
import toast from "react-hot-toast";

import { UseAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";

// import { ProfileInfoTypes } from "../../../Types";

export const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [caregiver, setCaregiver] = useState<string>("");
  // const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, setLoading, isSubmitted, setIsSubmitted } = UseTimeInfo();

  const {
    // loggedIn,

    setPassword,
    password,
  } = UseAuthProviderContext();
  const { setActiveMainComponent } = useActiveComponent();
  const { setProfileUsername, token, setToken } = UseHistoryIDComponent();

  const passwordsDoMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  const doesUsernameExist = async () => {
    const usernames = await getAllProfileUserNames().then((data) => data);

    return usernames.some(
      (exitingUsername) =>
        exitingUsername.username === username.toLowerCase()
    );
  };

  const passwordErrorMessage = "Passwords do not match";
  const shouldShowPasswordErrorMessage =
    isSubmitted && !passwordsDoMatch(password, confirmPassword);
  const shouldShowUsernameErrorMessage = isSubmitted && doesUsernameExist();
  const usernameErrorMessage = "Username already Exist";

  return (
    <>
      <div className="profilePage">
        <h1>Create Profile</h1>
        <div className="profile">
          <form
            action="POST"
            className="profileForm"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!passwordsDoMatch(password, confirmPassword)) {
                setIsSubmitted(true);

                return;
              }
              const usernameExist = await doesUsernameExist();
              console.log(usernameExist);

              if (usernameExist) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);

              return postInfo(
                {
                  username: username.toLowerCase(),
                  password: password,
                  caregiver: caregiver,
                  email: email,
                },
                profileUrl
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  return response.json();
                })
                .then(async (data) => {
                  const authorize = await authorization(
                    data.username,
                    data.password
                  );
                  setToken(authorize.token);
                  if (authorize.token) {
                    getProfile(authorize.token).then((profile) => {
                      setProfileUsername(profile.username);
                    });
                  }
                })
                .then(() => {
                  toast.success("Profile Saved");
                })
                .then(() => {
                  setActiveMainComponent("addChild");
                })
                .then(() => {
                  setLoading(false);
                })
                .catch((e) => {
                  toast.error(e);
                });
            }}
          >
            <div className="inputContainer">
              <label htmlFor="name" className="profileLabel">
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
              <label htmlFor="email" className="profileLabel">
                Email:
              </label>

              <input
                type="text"
                name="email"
                id="email"
                className="profileInput"
                value={email}
                onChange={(e) => {
                  setEmail(preventKeyingSpaces(e.target.value));
                }}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="caregiver" className="profileLabel">
                Child(ren) Caregiver's Name:{" "}
              </label>
              <input
                type="text"
                name="caregiver"
                id="caregiver"
                className="profileInput"
                value={caregiver}
                onChange={(e) => {
                  setCaregiver(preventKeyingNumbers(e.target.value));
                }}
                placeholder="Ex. Grandma, Babysitter's name, self"
              />
            </div>

            <div className={`inputContainer ${token ? "hidden" : ""}`}>
              <label htmlFor="password" className="profileLabel">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="profileInput"
                value={password}
                onChange={(e) => {
                  setPassword(preventKeyingSpaces(e.target.value));
                }}
              />
            </div>
            <div className={`inputContainer ${token ? "hidden" : ""}`}>
              <label htmlFor="password" className="profileLabel">
                Confirm New Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="profileInput"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            {shouldShowPasswordErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className={`inputContainer ${token ? "" : "hidden"}`}>
              <label htmlFor="password" className="profileLabel">
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
            <div className={`inputContainer ${token ? "" : "hidden"}`}>
              <label htmlFor="password" className="profileLabel">
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

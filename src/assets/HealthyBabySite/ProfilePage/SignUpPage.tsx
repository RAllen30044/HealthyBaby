import { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  authorization,
  getAllProfileEmails,
  getAllProfileUserNames,
  getProfile,
  postInfo,
  postProfile,
  profilesUrl,
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
import {
  ProfileEmailTypes,
  ProfileInfoTypes,
  ProfileUsernameTypes,
} from "../../../../Types";

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
  const [userEmails, setUserEmails] = useState<ProfileEmailTypes[]>([]);
  const [userNames, setUserNames] = useState<ProfileUsernameTypes[]>([]);
  const {
    // loggedIn,

    setPassword,
    password,
  } = UseAuthProviderContext();
  const { setActiveMainComponent } = useActiveComponent();
  const { setProfileUsername, token } = UseHistoryIDComponent();

  useEffect(() => {
    getAllProfileUserNames().then((data) => {
      setUserNames(data);
    });
    getAllProfileEmails().then((data) => {
      setUserEmails(data);
    });
  }, []);

  const passwordsDoMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  const doesUsernameExist = () => {
    return userNames.some(
      (exitingUsername) => exitingUsername.username === username.toLowerCase()
    );
  };

  const doesEmailExist = () => {
    return userEmails.some(
      (exitingEmail) => exitingEmail.email === email.toLowerCase()
    );
  };

  const passwordErrorMessage = "Passwords do not match";
  const shouldShowPasswordErrorMessage =
    isSubmitted && !passwordsDoMatch(password, confirmPassword);
  const shouldShowUsernameErrorMessage = isSubmitted && doesUsernameExist();
  const shouldShowEmailErrorMessage = isSubmitted && doesEmailExist();
  const usernameErrorMessage = "Username already Exist";
  const emailErrorMessage = "Email already Exist";

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

              // const usernameExist = await doesUsernameExist();
              // const emailExist = await doesEmailExist();
              if (
                doesEmailExist() ||
                doesUsernameExist() ||
                !passwordsDoMatch(password, confirmPassword)
              ) {
                setIsSubmitted(true);
                return;
              }

              setIsSubmitted(false);
              setLoading(true);

              postInfo(
                {
                  username: username.toLowerCase(),
                  password: password,
                  caregiver: caregiver,
                  email: email.toLowerCase(),
                },
                profilesUrl
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  return response.json();
                })
                .then(() => {
                  setProfileUsername(username);
                  
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
                  console.log(e);
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
            {shouldShowEmailErrorMessage && (
              <ErrorMessage message={emailErrorMessage} show={true} />
            )}
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

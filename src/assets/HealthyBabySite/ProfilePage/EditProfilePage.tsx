import { useState } from "react";
import "./ProfilePage.css";
import { updateProfileInfo } from "../../../../callApis";
import { UseTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";
import { preventKeyingNumbers } from "../../../ErrorHandling";
import toast from "react-hot-toast";

import { UseAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
// import { ProfileInfoTypes } from "../../../Types";

export const EditProfilePage = () => {
  const { maybeUser, setPassword, password } = UseAuthProviderContext();

  // const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>(
    maybeUser ? JSON.parse(maybeUser).caregiver : ""
  );
  // const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, setLoading, isSubmitted, setIsSubmitted } = UseTimeInfo();

  // const [profileUserName, setProfileUsername] = useState<string>(
  //   maybeUser ? JSON.parse(maybeUser).username : ""
  // );
  const { setActiveHomePageComponent, setActiveMainComponent } =
    useActiveComponent();
  const { setProfileUsername } = UseHistoryIDComponent();

  const passwordsDoMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const passwordErrorMessage = "Passwords do not match";
  const passwordEntryErrorMessage = "You have not entered a password to change";
  const shouldShowPasswordErrorMessage =
    isSubmitted && !passwordsDoMatch(password, confirmPassword);
  const shouldShowNoPasswordEntryMessage = isSubmitted && password.length === 0;

  return (
    <>
      <div className="profilePage">
        <h1>Edit Profile</h1>
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
              if (password.length === 0) {
                setIsSubmitted(true);
                return;
              }
              setIsSubmitted(false);
              setLoading(true);
              if (maybeUser) {
                return updateProfileInfo(
                  childCaregiver,
                  password,
                  //replace with Username
                  ""
                  //
                )
                  .then((res) => {
                    if (!res.ok) {
                      toast.error("Save Failed");
                      return;
                    }
                    toast.success("Profile Updated");
                    return res.json();
                  })
                  .then((data) => {
                    setActiveHomePageComponent("feeding");
                    setActiveMainComponent("home");

                    const username = JSON.parse(maybeUser).username;

                    const userPassword = JSON.parse(
                      JSON.stringify(data)
                    ).password;
                    const userId = JSON.parse(JSON.stringify(data)).id;
                    //Set to current username
                    setProfileUsername("");

                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        username: username,
                        caregiver: childCaregiver,
                        password: userPassword,
                        id: userId,
                      })
                    );
                  })
                  .then(() => {
                    setLoading(false);
                  })
                  .catch((e) => {
                    toast.error(e);
                  });
              }
            }}
          >
            <div className="inputContainer">
              <label htmlFor="name" className="profileLabel">
                Username:
              </label>
              <span>{maybeUser ? JSON.parse(maybeUser).username : ""}</span>
            </div>
            <div className="inputContainer">
              <label htmlFor="caregiver" className="profileLabel">
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
              <label htmlFor="password" className="profileLabel">
                Password:
              </label>
              <input
                type="password"
                title="password"
                name="password"
                id="password"
                className="profileInput"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=""
              />
            </div>
            <div className={`inputContainer ${maybeUser ? "hidden" : ""}`}>
              <label htmlFor="password" className="profileLabel">
                Confirm New Password:
              </label>
              <input
                type="password"
                title="confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
                className="profileInput"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder=""
              />
            </div>{" "}
            {shouldShowPasswordErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className={`inputContainer ${maybeUser ? "" : "hidden"}`}>
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
                title="newPassword"
                placeholder=""
              />
            </div>
            {shouldShowNoPasswordEntryMessage && (
              <ErrorMessage message={passwordEntryErrorMessage} show={true} />
            )}
            <div className={`inputContainer ${maybeUser ? "" : "hidden"}`}>
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
                title="confirmNewPassword"
                placeholder=""
              />
            </div>
            {shouldShowPasswordErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className="buttonContainer">
              <button type="button" className="saveButton" disabled={loading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

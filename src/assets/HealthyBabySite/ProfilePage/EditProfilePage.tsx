import { useEffect, useState } from "react";
import "./ProfilePage.css";
import {
  authorization,
  getCurrentProfile,
  updateCurrentProfile,
  // updateProfileInfo,
} from "../../../../callApis";
import { UseTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";
import {
  isEmailValid,
  preventKeyingNumbers,
  preventKeyingSpaces,
} from "../../../ErrorHandling";
import toast from "react-hot-toast";

import { UseAuthProviderContext } from "../LandingPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { UseHistoryIDComponent } from "../../../HistoryProvider";
import { ProfileInfoTypes } from "../../../../Types";

export const EditProfilePage = () => {
  const { setPassword, password } = UseAuthProviderContext();

  const [childCaregiver, setChildCaregiver] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, setLoading, isSubmitted, setIsSubmitted } = UseTimeInfo();

  const { setActiveHomePageComponent, setActiveMainComponent } =
    useActiveComponent();
  const { setProfileUsername, token, setToken } = UseHistoryIDComponent();

  const [profile, setProfile] = useState<Partial<ProfileInfoTypes>>({
    caregiver: "",
    email: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  useEffect(() => {
    const fetch = async () => {
      const myProfile = await getCurrentProfile(token);
      setProfile(myProfile);
      if (!token) {
        const newToken = await authorization(
          profile.username!.toLowerCase(),
          newPassword
        );
        setToken(newToken.token);
        localStorage.setItem("token", newToken.token);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const passwordsDoMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const passwordErrorMessage = "Passwords do not match";
  const passwordEntryErrorMessage =
    "You must enter a password to update profile";
  const emailValidationMessage = "Email not valid, Please enter a valid email";
  const shouldShowPasswordNoMatchErrorMessage =
    isSubmitted && !passwordsDoMatch(newPassword, confirmPassword);
  const shouldShowNoPasswordEntryMessage = isSubmitted && password.length === 0;
  const shouldShowEmailValidationMessage =
    isSubmitted && !isEmailValid(newEmail);
  return (
    <>
      <div className="profilePage">
        <h1>Edit Profile</h1>
        <div className="profile">
          <form
            action="POST"
            className="profileForm"
            onSubmit={async (e) => {
              e.preventDefault();
              const authorize = await authorization(
                profile.username!.toLowerCase(),
                password
              );

              if (
                !passwordsDoMatch(newPassword, confirmPassword) ||
                password.length === 0 ||
                !authorize.token ||
                !isEmailValid(newEmail)
              ) {
                setIsSubmitted(true);
                if (!authorize.token) {
                  toast.error("Invalid Current Password. Profile Not Updated");
                }

                return;
              }

              setIsSubmitted(false);
              setLoading(true);

              if (authorize.token) {
                return updateCurrentProfile(
                  {
                    caregiver: childCaregiver,
                    password: newPassword,
                    email: newEmail,
                  },

                  authorize.token
                )
                  .then((res) => {
                    if (!res.ok) {
                      toast.error("Save Failed");
                      return;
                    }
                    toast.success("Profile Updated");
                    return res.json();
                  })
                  .then(() => {
                    setActiveHomePageComponent("feeding");
                    setActiveMainComponent("home");

                    setProfileUsername("");
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
              <span>{token ? profile.username : ""}</span>
            </div>
            <div className="inputContainer">
              <label htmlFor="caregiver" className="profileLabel">
                Child(ren) Caregiver:{" "}
              </label>
              <input
                type="text"
                name="caregiver"
                id="caregiver"
                placeholder={`${profile.caregiver}`}
                className="profileInput"
                value={childCaregiver}
                onChange={(e) => {
                  setChildCaregiver(preventKeyingNumbers(e.target.value));
                }}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="email" className="profileLabel">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder={`${profile.email}`}
                className="profileInput"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(preventKeyingSpaces(e.target.value));
                }}
              />
            </div>
            {shouldShowEmailValidationMessage && (
              <ErrorMessage message={emailValidationMessage} show={true} />
            )}
            <div className={`inputContainer `}>
              <label htmlFor="password" className="profileLabel">
                Current Password:
              </label>
              <input
                type="password"
                title="password"
                name="password"
                id="password"
                className="profileInput"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=""
              />
            </div>
            {shouldShowNoPasswordEntryMessage && (
              <ErrorMessage message={passwordEntryErrorMessage} show={true} />
            )}
            <div className={`inputContainer `}>
              <label htmlFor="password" className="profileLabel">
                New Password:
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="profileInput"
                autoComplete="new-password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                title="newPassword"
                placeholder=""
              />
            </div>

            <div className={`inputContainer `}>
              <label htmlFor="password" className="profileLabel">
                Confirm New Password:
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="profileInput"
                autoComplete="new-password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                title="confirmNewPassword"
                placeholder=""
              />
            </div>
            {shouldShowPasswordNoMatchErrorMessage && (
              <ErrorMessage message={passwordErrorMessage} show={true} />
            )}
            <div className="buttonContainer">
              <button type="submit" className="saveButton" disabled={loading}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

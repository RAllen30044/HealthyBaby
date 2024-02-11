import { useState } from "react";
import "./ProfilePage.css";
import { updateProfileInfo } from "../../../api";
import { useTimeInfo } from "../../HomePage/TimeInfo/TimeInfoProvider";
import { preventKeyingNumbers } from "../../../ErrorHandling";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthProviderContext } from "../authenticationPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { useHistoryIDComponent } from "../../../HistoryProvider";
// import { ProfileInfoTypes } from "../../../Types";

export const EditProfilePage = () => {
  const { maybeUser, setPassword, password } = useAuthProviderContext();

  // const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>(
    maybeUser ? JSON.parse(maybeUser).caregiver : ""
  );
  // const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, setLoading, isSubmitted, setIsSubmitted } = useTimeInfo();
  const navigate = useNavigate();
  // const [profileUserName, setProfileUsername] = useState<string>(
  //   maybeUser ? JSON.parse(maybeUser).username : ""
  // );
  const { setActiveComponent } = useActiveComponent();
  const { setProfileId } = useHistoryIDComponent();

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
                  Number.parseInt(JSON.parse(maybeUser).id)
                )
                  .then((res) => {
                    if (!res.ok) {
                      toast.error("Save Failed");
                      return;
                    }
                    toast.success("Profile Saved");
                    return res.json();
                  })
                  .then((data) => {
                    navigate("/home");
                    setActiveComponent("feeding");

                    const username = JSON.parse(maybeUser).username;
               

                    const userPassword = JSON.parse(
                      JSON.stringify(data)
                    ).password;
                    const userId = JSON.parse(JSON.stringify(data)).id;
                    setProfileId(userId);
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
              <label htmlFor="name" className="profileLable">
                Username:
              </label>
              <span>{maybeUser ? JSON.parse(maybeUser).username : ""}</span>
            </div>
            {/* <div className="inputContainer">
              <label htmlFor="email" className="profileLable">
                EMAIL:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="profileInput"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div> */}
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
            {/* <div className="inputContainer">
              <label htmlFor="caretaker" className="profileLable">
                Child(ren) Caregiver Email:{" "}
              </label>
              <input
                type="email"
                name="caregiverEmail"
                id="caregiverEmail"
                className="profileInput"
                value={childCaregiverEmail}
                onChange={(e) => {
                  setChildCaregiverEmail(e.target.value);
                }}
              />
            </div> */}
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {shouldShowPasswordErrorMessage && (
                <ErrorMessage message={passwordErrorMessage} show={true} />
              )}
            </div>

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
              {shouldShowNoPasswordEntryMessage && (
                <ErrorMessage message={passwordEntryErrorMessage} show={true} />
              )}
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
              {shouldShowPasswordErrorMessage && (
                <ErrorMessage message={passwordErrorMessage} show={true} />
              )}
            </div>
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

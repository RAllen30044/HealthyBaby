import { useState } from "react";
import "./ProfilePage.css";
import { postInfo, profileUrl } from "../../../api";
import { useTimeInfo } from "../../HomePage/TimeInfo/TimeInfo";
import { preventKeyingNumbers, preventKeyingSpaces } from "../../../ErrorHandling";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthProviderContext } from "../authenticationPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";
import { ErrorMessage } from "../../../ErrorMessage";
import { useHistoryIDComponent } from "../../../HistoryProvider";
// import { ProfileInfoTypes } from "../../../Types";

export const ProfilePage = () => {
  const [username, setUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>("");
  // const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, setLoading, isSubmitted, setIsSubmitted } = useTimeInfo();
  const navigate = useNavigate();
  const { loggedIn, maybeUser, email, setPassword, password } =
    useAuthProviderContext();
  const { setActiveComponent } = useActiveComponent();
  const { setProfileId } = useHistoryIDComponent();
  const passwordDonotMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const passwordErrorMessage = "Passwords do not match";
  const shouldShowPasswordError = isSubmitted && passwordDonotMatch;

  return (
    <>
      <div className="profilePage">
        <h1>Profile</h1>
        <div className="profile">
          <form
            action="POST"
            className="profileForm"
            onSubmit={(e) => {
              e.preventDefault();
              if (!passwordDonotMatch(password, confirmPassword)) {
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
                  // userEmail: email,
                  // cargiverEmail: childCaregiverEmail,
                },
                profileUrl
              )
                .then((data) => {
                  toast.success("Profile Saved");
                  return data.json();
                })
                .then((data) => {
                  navigate("/home");
                  setActiveComponent("addChild");
                  if (!maybeUser) {
                    const userEmail = JSON.parse(
                      JSON.stringify(data)
                    ).userEmail;

                    const userPassword = JSON.parse(
                      JSON.stringify(data)
                    ).password;
                    const userId = JSON.parse(JSON.stringify(data)).id;
                    setProfileId(userId);
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        username: userEmail,
                        password: userPassword,
                        id: userId,
                      })
                    );
                  }
                })

                .then(() => {
                  loggedIn(email, password);
                  setLoading(false);
                })
                .catch((e) => {
                  toast.error(e);
                });
            }}
          >
            <div className="inputContainer">
              <label htmlFor="name" className="profileLable">
                NAME:
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {shouldShowPasswordError && (
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
              {shouldShowPasswordError && (
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

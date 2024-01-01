import { useState } from "react";
import "./ProfilePage.css";
import { postInfo, profileUrl } from "../../../api";
import { useTimeInfo } from "../../HomePage/TimeInfo/TimeInfo";
import { preventKeyingNumbers } from "../../../ErrorHandling";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthProviderContext } from "../authenticationPage/authProvider";
import { useActiveComponent } from "../Header/ActiveComponentProvider";

export const ProfilePage = () => {
  const [profileName, setProfileName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>("");
  const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, setLoading } = useTimeInfo();
  const navigate = useNavigate();
  const { setLog } = useAuthProviderContext();
  const { setActiveComponent } = useActiveComponent();
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
              setLoading(true);
              return postInfo(
                {
                  username: profileName,
                  password: password,
                  caregiver: childCaregiver,
                  userEmail: email,
                  cargiverEmail: childCaregiverEmail,
                },
                profileUrl
              )
                .then(() => {
                  toast.success("Profile Saved");
                })
                .then(() => {
                  navigate("/home");
                  setLog("logOut");
                  setActiveComponent("addChild");
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
              <label htmlFor="name" className="profileLable">
                NAME:
              </label>

              <input
                type="text"
                name="name"
                id="name"
                className="profileInput"
                value={profileName}
                onChange={(e) => {
                  setProfileName(preventKeyingNumbers(e.target.value));
                }}
              />
            </div>

            <div className="inputContainer">
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
            </div>

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

            <div className="inputContainer">
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
            </div>

            <div className="inputContainer">
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
                autoComplete="password"
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="password" className="profileLable">
                New Password:
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="profileInput"
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="password" className="profileLable">
                Confirm New Password:
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="profileInput"
              />
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

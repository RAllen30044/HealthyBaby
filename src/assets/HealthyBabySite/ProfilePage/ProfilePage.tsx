import { useState } from "react";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const [profileName, setProfileName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [childCaregiver, setChildCaregiver] = useState<string>("");
  const [childCaregiverEmail, setChildCaregiverEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
                onChange={(e)=>{
                  setProfileName(e.target.value)
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
                onChange={(e)=>{
                  setEmail(e.target.value)
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
                onChange={(e)=>{
                  setChildCaregiver(e.target.value)
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
                onChange={(e)=>{
                  setChildCaregiverEmail(e.target.value)
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
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                
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
              <button className="saveButton">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

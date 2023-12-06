import "./ProfilePage.css";

export const ProfilePage = () => {
  return (
    <>
      <div className="profilePage">
        <h1>Profile</h1>
        <div className="profile">
          <form action="POST" className="profileForm" 
          onSubmit={(e)=>{
            e.preventDefault();
          }}>
            <div className="inputContainer">
              <label htmlFor="name" className="profileLable">
                NAME:
              </label>

              <input
                type="text"
                name="name"
                id="name"
                className="profileInput"
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

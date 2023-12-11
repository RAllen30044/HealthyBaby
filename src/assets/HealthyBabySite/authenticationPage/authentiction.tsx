import { useEffect, useState } from "react";
import { Request } from "../../../api";
import { User } from "../../../Types";
import toast from "react-hot-toast";
import "./authenticationPage.css";

export const AuthenticationPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    return Request.getUser();
  };

  const isUserValid = (username: string, password: string) => {
    return fetchData().then((users) => {
      const userExist = users.some(
        (user) => user.username === username && user.password === password
      );
      if (userExist) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const AddUser = (user: Omit<User, "id">) => {
    return Request.postUser(user).then(() => {
      setIsLoading(true);
      fetchData()
        .catch((err) => console.log(err))
        .then(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <>
      <div className="authentication">
        <div className="card">
          <form
            action="POST"
            onSubmit={(e) => {
              e.preventDefault();
              isUserValid(userNameInput, passwordInput).then(() => {
                setUser({ username: userNameInput, password: passwordInput });

                localStorage.setItem("user", JSON.stringify(user));
                toast.success("Success");
                setUserNameInput("");
                setPasswordInput("");
              });
            }}
          >
            <h3>Login</h3>
            <div className="username">
              <label htmlFor="user">Username: </label>
              <input
                type="text"
                value={userNameInput}
                onChange={(e) => {
                  setUserNameInput(e.target.value);
                }}
              />
            </div>
            <div className="password">
              <label htmlFor="user">Password: </label>
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="logInButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

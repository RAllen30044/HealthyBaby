import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { User } from "./Types";
import { Request } from "./api";
import toast from "react-hot-toast/headless";

function App() {
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello {user?.username}</h1>
      <div className="card">
        <h1>Create User</h1>
        <form
          action="POST"
          onSubmit={(e) => {
            e.preventDefault();
            AddUser({
              username: userName,
              password: password,
            })
              .then(() => {
                toast.success("Registered");

                setUserName("");
                setPassword("");
              })
              .catch(() => {
                toast.error("My POST is broken");
              });
          }}
        >
          <label htmlFor="userName">User Name: </label>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            type="text"
          />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="text"
          />
          <br />
          <br />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
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
          <label htmlFor="user">User Name: </label>
          <input
            type="text"
            value={userNameInput}
            onChange={(e) => {
              setUserNameInput(e.target.value);
            }}
          />
          <label htmlFor="user">Password: </label>
          <input
            type="text"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default App;
